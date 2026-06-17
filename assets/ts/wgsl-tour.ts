/**
 * Copyright 2023 The Tour of WGSL Authors
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import VisualizerBuilder, { CompilationFailure, VisualizerError, Visualizer } from './visualizer';
import WGSLDocs from './wgsl-docs';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { hoverTooltip } from '@codemirror/view';
import { wgsl } from '@iizukak/codemirror-lang-wgsl';
import { syntaxTree } from '@codemirror/language';
import { lintGutter, setDiagnostics, Diagnostic } from '@codemirror/lint';

export class WGSLTour extends HTMLElement {
  visualization: Visualizer | undefined = undefined;
  visualizationBuilder: VisualizerBuilder | undefined = undefined;
  bootstrap: string = '';
  editor!: EditorView;
  output!: HTMLElement;
  frame_number: number = 0;
  key_timer: ReturnType<typeof setTimeout> | undefined = undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
      }
      canvas,
      #wgsl-tour-output-canvas,
      #wgsl-tour-output-text {
        width: 100%;
        max-width: 640px;
        margin-top: 10px;
        display: block;
      }
      #wgsl-tour-output-canvas {
        height: 480px;
      }
      #canvas {
        display: flex;
        justify-content: center;
        align-items: start;
      }
      .cm-editor {
        border: 1px solid var(--md-default-fg-color--lite, #e2e8f0);
        height: 350px;
        border-radius: 4px;
      }
      .wgsl-tooltip {
        border-radius: 5px;
        margin: 0;
        margin-left: 2px;
        padding: 4px;
        border: 1px solid #14b8a6;
        overflow: auto;
        background-color: var(--md-code-bg-color, #f8fafc);
        color: var(--md-code-fg-color, #0f172a);
      }
    `;
    shadow.appendChild(style);

    const editorContainer = document.createElement('div');
    editorContainer.className = 'editor-container';
    shadow.appendChild(editorContainer);

    this.output = document.createElement('div');
    this.output.setAttribute('id', 'output');
    shadow.appendChild(this.output);

    const pre = this.querySelector('#tour-content');
    const code = (pre ? pre.textContent : this.textContent) || '';

    const rebuild = () => {
      this.frame_number = 0;
      if (this.visualizationBuilder) {
        this.buildVisualization();
      }
    };

    const docsTooltip = hoverTooltip((view, pos, side) => {
      const tree = syntaxTree(view.state);
      const token = tree.resolveInner(pos, side);
      const text = view.state.sliceDoc(token.from, token.to);
      const docs = WGSLDocs.getDocsFor(text, token.name);
      if (!docs) return null;
      return {
        pos: token.from,
        end: token.to,
        above: true,
        create() {
          const dom = document.createElement('div');
          dom.className = 'wgsl-tooltip';
          dom.innerHTML = `<pre>${docs}</pre>`;
          return { dom };
        },
      };
    });

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        if (this.key_timer !== undefined) clearTimeout(this.key_timer);
        this.key_timer = setTimeout(rebuild, 1000);
      }
    });

    this.editor = new EditorView({
      doc: code,
      extensions: [basicSetup, wgsl(), lintGutter(), docsTooltip, updateListener],
      parent: editorContainer,
    });
  }

  setBootstrap(src: string) {
    this.bootstrap = src;
  }

  async setVisualizationBuilder(val: VisualizerBuilder) {
    this.visualizationBuilder = val;
    try {
      if (!navigator.gpu) {
        throw new VisualizerError('WebGPU is not supported in this browser');
      }
      await this.visualizationBuilder.configure(this.output);
    } catch (e: any) {
      this.onPipelineFailure({ message: e.message || e.toString() } as VisualizerError);
      return false;
    }

    this.buildVisualization();
    return true;
  }

  buildVisualization() {
    if (!this.visualizationBuilder) return;

    this.editor.dispatch(setDiagnostics(this.editor.state, []));
    this.visualization = undefined;

    this.visualizationBuilder
      .build(this.editor.state.doc.toString() + this.bootstrap)
      .then((visualization) => {
        this.visualization = visualization;
        requestAnimationFrame(() => this.frame());
      })
      .catch((err: any) => {
        if (err.hasOwnProperty('diagnostics')) {
          this.onCompilationFailure(err as CompilationFailure);
        } else if (err.hasOwnProperty('visualizer_error') || err.message) {
          this.onPipelineFailure(err as VisualizerError);
        } else {
          console.log(err);
        }
      });
  }

  frame() {
    if (this.visualization === undefined) return;

    this.frame_number++;
    this.visualization.execute(this.frame_number);

    if (this.visualization.executeFrequency === 'repeat') {
      requestAnimationFrame(() => this.frame());
    }
  }

  onCompilationFailure(failure: CompilationFailure) {
    const diagnostics: Diagnostic[] = failure.diagnostics.map((diag) => {
      const lineInfo = this.editor.state.doc.line(diag.line);
      const from = lineInfo.from + Math.max(0, diag.column - 1);
      const to = Math.min(from + (diag.length || 1), lineInfo.to);
      return {
        from,
        to,
        severity: diag.kind === 'error' ? 'error' : 'warning',
        message: diag.msg,
      };
    });
    this.editor.dispatch(setDiagnostics(this.editor.state, diagnostics));
  }

  onPipelineFailure(failure: VisualizerError) {
    const diag: Diagnostic = {
      from: 0,
      to: 0,
      severity: 'error',
      message: failure.message,
    };
    this.editor.dispatch(setDiagnostics(this.editor.state, [diag]));
  }
}
customElements.define('wgsl-tour', WGSLTour);
