const R = require('ramda');

function parseExpression(str) {

    const O_ADD = '+';
    const O_SUB = '-';
    const O_MUL = '*';
    const O_DIV = '/';

    const T_OPERATOR = 'Operator';
    const T_NUM = 'Number;'
    const T_EOF = 'EOF';

    const AST_LIT = 'Literal';
    const AST_EXP_BIN = 'BinaryExpression';

    function tokenize(str) {

        return str
            .split(/\s/)
            .filter(t => t.length > 0)
            .map(t => {
                if (isNaN(t)) {
                    return { type: T_OPERATOR, value: t };
                } else {
                    return { type: T_NUM, value: Number(t) }
                }
            });
    }
   
    function parseTokens(tokens) {
        let pos = 0;

        function peek() {
            return tokens[pos] || { type: T_EOF };
        }

        function pop() {
            return tokens[pos++];
        }

        function parseExpression() {
            let node = parseTerm();
            let token = peek();

            while (token.type === T_OPERATOR && (token.value === O_ADD || token.value === O_SUB)) {
                token = pop();
                const left = node;
                const right = parseTerm();
                node = { operator: token.value, left, right };
                token = peek();
            }

            return node;
        }

        function parseTerm() {
            let node = parsePrimary();
            let token = peek();

            while (token.type === T_OPERATOR && (token.value === O_MUL || token.value === O_DIV)) {
                token = pop();
                const left = node;
                const right = parsePrimary();
                node = { operator: token.value, left, right };
                token = peek();
            }

            return node;
        }

        function parsePrimary() {
            if (peek().type === T_EOF) {
                throw Error(`Unexpected end of expression`);
            }

            if (isNaN(peek().value)) {
                throw Error(`Unexpected value ${peek().value} at position ${pos + 1}`);
            }

            const token = pop();
            return token.value;
        }

        const ast = parseExpression();

        if (pos < tokens.length) {
            throw Error(`Unexpected value ${peek().value} at position ${pos + 1}`);
        }

        return ast;

    }

    // -----

    const tokens = tokenize(str);
    const ast = parseTokens(tokens);

    return ast;
}

module.exports = {
    parseExpression
}