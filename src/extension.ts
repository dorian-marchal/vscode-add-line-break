'use strict';

import * as vscode from 'vscode';

// If direction is 'before', add a line before the selected lines
// else, add a new line after the selected lines.
const addLineBreak = (direction) => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    const selections = editor.selections;
    const newLinePositions = [];

    selections.forEach((selection, i) => {
        const { start, end } = selection;

        newLinePositions.push((direction === 'before')
            ? (new vscode.Position(start.line, 0))
            : (new vscode.Position(end.line + 1, 0)));
    });

    editor.edit((editBuilder) =>
        newLinePositions.forEach((newLinePosition) =>
            editBuilder.insert(newLinePosition, '\n')
        )
    );
};

export function activate(context: vscode.ExtensionContext) {
    console.log('"add-line-break" is now active.');

    context.subscriptions.push(vscode.commands.registerCommand(
        'extension.addNewLineBeforeSelection',
        () => addLineBreak('before')
    ));

    context.subscriptions.push(vscode.commands.registerCommand(
        'extension.addNewLineAfterSelection',
        () => addLineBreak('after')
    ));
}

export function deactivate() {
}
