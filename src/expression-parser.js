const R = require('ramda');

/**
 * Entry point: takes an arithmetic expression string,
 * tokenizes it, parses the tokens, and returns an AST.
 *
 * @param {string} str - The arithmetic expression to parse, e.g. "2 + 3 * 4".
 * @return {object|number} The abstract syntax tree (AST) representing the expression.
 */
function parseExpression(str) {
    const O_ADD = '+';
    const O_SUB = '-';
    const O_MUL = '*';
    const O_DIV = '/';

    const T_OPERATOR = 'Operator';
    const T_NUM = 'Number';
    const T_EOF = 'EOF';

    /**
     * Splits the input string into an array of token objects.
     * Operators are labeled T_OPERATOR, numbers T_NUM.
     *
     * @param {string} input - The raw expression string.
     * @return {Array<{type: string, value: string|number}>} Array of token objects.
     */
    function tokenize(input) {
        return input
            .split(/\s+/)
            .filter(t => t.length > 0)
            .map(t => {
                if (isNaN(t)) {
                    return { type: T_OPERATOR, value: t };
                } else {
                    return { type: T_NUM, value: Number(t) };
                }
            });
    }
   
    /**
     * Takes an array of tokens and builds a recursive AST.
     *
     * @param {Array<{type: string, value: string|number}>} tokens - Token list to parse.
     * @return {object|number} AST or numeric literal.
     */
    function generateAstFromTokens(tokens) {
        let pos = 0;

        /**
         * Returns the current token without advancing.
         *
         * @return {{type: string, value?: any}} The current token or EOF token.
         */
        function peek() {
            return tokens[pos] || { type: T_EOF };
        }

        /**
         * Consumes and returns the current token.
         *
         * @return {{type: string, value?: any}} The consumed token.
         */
        function consume() {
            return tokens[pos++];
        }

        /**
         * Parses addition and subtraction, left-associatively.
         *
         * @return {object|number} AST node for addition/subtraction or sub-expression.
         */
        function parseAdditionAndSubtraction() {
            let node = parseMultiplicationAndDivision();
            let token = peek();

            while (token.type === T_OPERATOR && (token.value === O_ADD || token.value === O_SUB)) {
                token = consume();
                const left = node;
                const right = parseMultiplicationAndDivision();
                node = { operator: token.value, left, right };
                token = peek();
            }

            return node;
        }

        /**
         * Parses multiplication and division, left-associatively.
         *
         * @return {object|number} AST node for multiplication/division or sub-expression.
         */
        function parseMultiplicationAndDivision() {
            let node = parsePrimaryValue();
            let token = peek();

            while (token.type === T_OPERATOR && (token.value === O_MUL || token.value === O_DIV)) {
                token = consume();
                const left = node;
                const right = parsePrimaryValue();
                node = { operator: token.value, left, right };
                token = peek();
            }

            return node;
        }

        /**
         * Parses a primary value (must be a number),
         * throws on unexpected token or end of input.
         *
         * @throws {Error} If an unexpected token or end of input is encountered.
         * @return {number} The numeric value of the token.
         */
        function parsePrimaryValue() {
            if (peek().type === T_EOF) {
                throw Error(`Unexpected end of expression`);
            }

            if (isNaN(peek().value)) {
                throw Error(`Unexpected value ${peek().value} at position ${pos + 1}`);
            }

            const token = consume();
            return token.value;
        }

        // Build the AST and ensure no leftover tokens
        const ast = parseAdditionAndSubtraction();
        if (pos < tokens.length) {
            throw Error(`Unexpected value ${peek().value} at position ${pos + 1}`);
        }

        return ast;
    }

    // Tokenize input, parse into AST, and return it
    const tokens = tokenize(str);
    const ast = generateAstFromTokens(tokens);

    return ast;
}

module.exports = {
    parseExpression
};
