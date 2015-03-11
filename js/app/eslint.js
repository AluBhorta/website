require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @fileoverview A factory for creating AST nodes
 * @author Fred K. Schott
 * @copyright 2014 Fred K. Schott. All rights reserved.
 * @copyright 2011-2013 Ariya Hidayat <ariya.hidayat@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var astNodeTypes = require("./ast-node-types");

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    /**
     * Create an Array Expression ASTNode out of an array of elements
     * @param {ASTNode[]} elements An array of ASTNode elements
     * @returns {ASTNode} An ASTNode representing the entire array expression
     */
    createArrayExpression: function (elements) {
        return {
            type: astNodeTypes.ArrayExpression,
            elements: elements
        };
    },

    /**
     * Create an Arrow Function Expression ASTNode
     * @param {ASTNode} params The function arguments
     * @param {ASTNode} defaults Any default arguments
     * @param {ASTNode} body The function body
     * @param {ASTNode} rest The rest parameter
     * @param {boolean} expression True if the arrow function is created via an expression.
     *      Always false for declarations, but kept here to be in sync with
     *      FunctionExpression objects.
     * @returns {ASTNode} An ASTNode representing the entire arrow function expression
     */
    createArrowFunctionExpression: function (params, defaults, body, rest, expression) {
        return {
            type: astNodeTypes.ArrowFunctionExpression,
            id: null,
            params: params,
            defaults: defaults,
            body: body,
            rest: rest,
            generator: false,
            expression: expression
        };
    },

    /**
     * Create an ASTNode representation of an assignment expression
     * @param {ASTNode} operator The assignment operator
     * @param {ASTNode} left The left operand
     * @param {ASTNode} right The right operand
     * @returns {ASTNode} An ASTNode representing the entire assignment expression
     */
    createAssignmentExpression: function (operator, left, right) {
        return {
            type: astNodeTypes.AssignmentExpression,
            operator: operator,
            left: left,
            right: right
        };
    },

    /**
     * Create an ASTNode representation of a binary expression
     * @param {ASTNode} operator The assignment operator
     * @param {ASTNode} left The left operand
     * @param {ASTNode} right The right operand
     * @returns {ASTNode} An ASTNode representing the entire binary expression
     */
    createBinaryExpression: function (operator, left, right) {
        var type = (operator === "||" || operator === "&&") ? astNodeTypes.LogicalExpression :
                    astNodeTypes.BinaryExpression;
        return {
            type: type,
            operator: operator,
            left: left,
            right: right
        };
    },

    /**
     * Create an ASTNode representation of a block statement
     * @param {ASTNode} body The block statement body
     * @returns {ASTNode} An ASTNode representing the entire block statement
     */
    createBlockStatement: function (body) {
        return {
            type: astNodeTypes.BlockStatement,
            body: body
        };
    },

    /**
     * Create an ASTNode representation of a break statement
     * @param {ASTNode} label The break statement label
     * @returns {ASTNode} An ASTNode representing the break statement
     */
    createBreakStatement: function (label) {
        return {
            type: astNodeTypes.BreakStatement,
            label: label
        };
    },

    /**
     * Create an ASTNode representation of a call expression
     * @param {ASTNode} callee The function being called
     * @param {ASTNode[]} args An array of ASTNodes representing the function call arguments
     * @returns {ASTNode} An ASTNode representing the entire call expression
     */
    createCallExpression: function (callee, args) {
        return {
            type: astNodeTypes.CallExpression,
            callee: callee,
            "arguments": args
        };
    },

    /**
     * Create an ASTNode representation of a catch clause/block
     * @param {ASTNode} param Any catch clause exeption/conditional parameter information
     * @param {ASTNode} body The catch block body
     * @returns {ASTNode} An ASTNode representing the entire catch clause
     */
    createCatchClause: function (param, body) {
        return {
            type: astNodeTypes.CatchClause,
            param: param,
            body: body
        };
    },

    /**
     * Creates an ASTNode representation of a class body.
     * @param {ASTNode} body The node representing the body of the class.
     * @returns {ASTNode} An ASTNode representing the class body.
     */
    createClassBody: function (body) {
        return {
            type: astNodeTypes.ClassBody,
            body: body
        };
    },

    createClassExpression: function (id, superClass, body) {
        return {
            type: astNodeTypes.ClassExpression,
            id: id,
            superClass: superClass,
            body: body
        };
    },

    createClassDeclaration: function (id, superClass, body) {
        return {
            type: astNodeTypes.ClassDeclaration,
            id: id,
            superClass: superClass,
            body: body
        };
    },

    createMethodDefinition: function (propertyType, kind, key, value, computed) {
        return {
            type: astNodeTypes.MethodDefinition,
            key: key,
            value: value,
            kind: kind,
            "static": propertyType === "static",
            computed: computed
        };
    },

    /**
     * Create an ASTNode representation of a conditional expression
     * @param {ASTNode} test The conditional to evaluate
     * @param {ASTNode} consequent The code to be run if the test returns true
     * @param {ASTNode} alternate The code to be run if the test returns false
     * @returns {ASTNode} An ASTNode representing the entire conditional expression
     */
    createConditionalExpression: function (test, consequent, alternate) {
        return {
            type: astNodeTypes.ConditionalExpression,
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    },

    /**
     * Create an ASTNode representation of a continue statement
     * @param {?ASTNode} label The optional continue label (null if not set)
     * @returns {ASTNode} An ASTNode representing the continue statement
     */
    createContinueStatement: function (label) {
        return {
            type: astNodeTypes.ContinueStatement,
            label: label
        };
    },

    /**
     * Create an ASTNode representation of a debugger statement
     * @returns {ASTNode} An ASTNode representing the debugger statement
     */
    createDebuggerStatement: function () {
        return {
            type: astNodeTypes.DebuggerStatement
        };
    },

    /**
     * Create an ASTNode representation of an empty statement
     * @returns {ASTNode} An ASTNode representing an empty statement
     */
    createEmptyStatement: function () {
        return {
            type: astNodeTypes.EmptyStatement
        };
    },

    /**
     * Create an ASTNode representation of an expression statement
     * @param {ASTNode} expression The expression
     * @returns {ASTNode} An ASTNode representing an expression statement
     */
    createExpressionStatement: function (expression) {
        return {
            type: astNodeTypes.ExpressionStatement,
            expression: expression
        };
    },

    /**
     * Create an ASTNode representation of a while statement
     * @param {ASTNode} test The while conditional
     * @param {ASTNode} body The while loop body
     * @returns {ASTNode} An ASTNode representing a while statement
     */
    createWhileStatement: function (test, body) {
        return {
            type: astNodeTypes.WhileStatement,
            test: test,
            body: body
        };
    },

    /**
     * Create an ASTNode representation of a do..while statement
     * @param {ASTNode} test The do..while conditional
     * @param {ASTNode} body The do..while loop body
     * @returns {ASTNode} An ASTNode representing a do..while statement
     */
    createDoWhileStatement: function (test, body) {
        return {
            type: astNodeTypes.DoWhileStatement,
            body: body,
            test: test
        };
    },

    /**
     * Create an ASTNode representation of a for statement
     * @param {ASTNode} init The initialization expression
     * @param {ASTNode} test The conditional test expression
     * @param {ASTNode} update The update expression
     * @param {ASTNode} body The statement body
     * @returns {ASTNode} An ASTNode representing a for statement
     */
    createForStatement: function (init, test, update, body) {
        return {
            type: astNodeTypes.ForStatement,
            init: init,
            test: test,
            update: update,
            body: body
        };
    },

    /**
     * Create an ASTNode representation of a for..in statement
     * @param {ASTNode} left The left-side variable for the property name
     * @param {ASTNode} right The right-side object
     * @param {ASTNode} body The statement body
     * @returns {ASTNode} An ASTNode representing a for..in statement
     */
    createForInStatement: function (left, right, body) {
        return {
            type: astNodeTypes.ForInStatement,
            left: left,
            right: right,
            body: body,
            each: false
        };
    },

    /**
     * Create an ASTNode representation of a for..of statement
     * @param {ASTNode} left The left-side variable for the property value
     * @param {ASTNode} right The right-side object
     * @param {ASTNode} body The statement body
     * @returns {ASTNode} An ASTNode representing a for..of statement
     */
    createForOfStatement: function (left, right, body) {
        return {
            type: astNodeTypes.ForOfStatement,
            left: left,
            right: right,
            body: body
        };
    },

    /**
     * Create an ASTNode representation of a function declaration
     * @param {ASTNode} id The function name
     * @param {ASTNode} params The function arguments
     * @param {ASTNode} defaults Any default arguments (ES6-only feature)
     * @param {ASTNode} body The function body
     * @param {ASTNode} rest The node representing a rest argument.
     * @param {boolean} generator True if the function is a generator, false if not.
     * @param {boolean} expression True if the function is created via an expression.
     *      Always false for declarations, but kept here to be in sync with
     *      FunctionExpression objects.
     * @returns {ASTNode} An ASTNode representing a function declaration
     */
    createFunctionDeclaration: function (id, params, defaults, body, rest, generator, expression) {
        return {
            type: astNodeTypes.FunctionDeclaration,
            id: id,
            params: params || [],
            defaults: defaults || [],
            body: body,
            rest: rest || null,
            generator: !!generator,
            expression: !!expression
        };
    },

    /**
     * Create an ASTNode representation of a function expression
     * @param {ASTNode} id The function name
     * @param {ASTNode} params The function arguments
     * @param {ASTNode} defaults Any default arguments (ES6-only feature)
     * @param {ASTNode} body The function body
     * @param {ASTNode} rest The node representing a rest argument.
     * @param {boolean} generator True if the function is a generator, false if not.
     * @param {boolean} expression True if the function is created via an expression.
     * @returns {ASTNode} An ASTNode representing a function declaration
     */
    createFunctionExpression: function (id, params, defaults, body, rest, generator, expression) {
        return {
            type: astNodeTypes.FunctionExpression,
            id: id,
            params: params || [],
            defaults: defaults || [],
            body: body,
            rest: rest || null,
            generator: !!generator,
            expression: !!expression
        };
    },

    /**
     * Create an ASTNode representation of an identifier
     * @param {ASTNode} name The identifier name
     * @returns {ASTNode} An ASTNode representing an identifier
     */
    createIdentifier: function (name) {
        return {
            type: astNodeTypes.Identifier,
            name: name
        };
    },

    /**
     * Create an ASTNode representation of an if statement
     * @param {ASTNode} test The if conditional expression
     * @param {ASTNode} consequent The consequent if statement to run
     * @param {ASTNode} alternate the "else" alternate statement
     * @returns {ASTNode} An ASTNode representing an if statement
     */
    createIfStatement: function (test, consequent, alternate) {
        return {
            type: astNodeTypes.IfStatement,
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    },

    /**
     * Create an ASTNode representation of a labeled statement
     * @param {ASTNode} label The statement label
     * @param {ASTNode} body The labeled statement body
     * @returns {ASTNode} An ASTNode representing a labeled statement
     */
    createLabeledStatement: function (label, body) {
        return {
            type: astNodeTypes.LabeledStatement,
            label: label,
            body: body
        };
    },

    /**
     * Create an ASTNode literal from the source code
     * @param {ASTNode} token The ASTNode token
     * @param {string} source The source code to get the literal from
     * @returns {ASTNode} An ASTNode representing the new literal
     */
    createLiteralFromSource: function (token, source) {
        var node = {
            type: astNodeTypes.Literal,
            value: token.value,
            raw: source.slice(token.range[0], token.range[1])
        };

        // regular expressions have regex properties
        if (token.regex) {
            node.regex = token.regex;
        }

        return node;
    },

    /**
     * Create an ASTNode template element
     * @param {Object} value Data on the element value
     * @param {string} value.raw The raw template string
     * @param {string} value.cooked The processed template string
     * @param {boolean} tail True if this is the final element in a template string
     * @returns {ASTNode} An ASTNode representing the template string element
     */
    createTemplateElement: function (value, tail) {
        return {
            type: astNodeTypes.TemplateElement,
            value: value,
            tail: tail
        };
    },

    /**
     * Create an ASTNode template literal
     * @param {ASTNode[]} quasis An array of the template string elements
     * @param {ASTNode[]} expressions An array of the template string expressions
     * @returns {ASTNode} An ASTNode representing the template string
     */
    createTemplateLiteral: function (quasis, expressions) {
        return {
            type: astNodeTypes.TemplateLiteral,
            quasis: quasis,
            expressions: expressions
        };
    },

    /**
     * Create an ASTNode representation of a spread element
     * @param {ASTNode} argument The array being spread
     * @returns {ASTNode} An ASTNode representing a spread element
     */
    createSpreadElement: function (argument) {
        return {
            type: astNodeTypes.SpreadElement,
            argument: argument
        };
    },

    /**
     * Create an ASTNode tagged template expression
     * @param {ASTNode} tag The tag expression
     * @param {ASTNode} quasi A TemplateLiteral ASTNode representing
     * the template string itself.
     * @returns {ASTNode} An ASTNode representing the tagged template
     */
    createTaggedTemplateExpression: function (tag, quasi) {
        return {
            type: astNodeTypes.TaggedTemplateExpression,
            tag: tag,
            quasi: quasi
        };
    },

    /**
     * Create an ASTNode representation of a member expression
     * @param {string} accessor The member access method (bracket or period)
     * @param {ASTNode} object The object being referenced
     * @param {ASTNode} property The object-property being referenced
     * @returns {ASTNode} An ASTNode representing a member expression
     */
    createMemberExpression: function (accessor, object, property) {
        return {
            type: astNodeTypes.MemberExpression,
            computed: accessor === "[",
            object: object,
            property: property
        };
    },

    /**
     * Create an ASTNode representation of a new expression
     * @param {ASTNode} callee The constructor for the new object type
     * @param {ASTNode} args The arguments passed to the constructor
     * @returns {ASTNode} An ASTNode representing a new expression
     */
    createNewExpression: function (callee, args) {
        return {
            type: astNodeTypes.NewExpression,
            callee: callee,
            "arguments": args
        };
    },

    /**
     * Create an ASTNode representation of a new object expression
     * @param {ASTNode[]} properties An array of ASTNodes that represent all object
     *      properties and associated values
     * @returns {ASTNode} An ASTNode representing a new object expression
     */
    createObjectExpression: function (properties) {
        return {
            type: astNodeTypes.ObjectExpression,
            properties: properties
        };
    },

    /**
     * Create an ASTNode representation of a postfix expression
     * @param {string} operator The postfix operator ("++", "--", etc.)
     * @param {ASTNode} argument The operator argument
     * @returns {ASTNode} An ASTNode representing a postfix expression
     */
    createPostfixExpression: function (operator, argument) {
        return {
            type: astNodeTypes.UpdateExpression,
            operator: operator,
            argument: argument,
            prefix: false
        };
    },

    /**
     * Create an ASTNode representation of an entire program
     * @param {ASTNode} body The program body
     * @returns {ASTNode} An ASTNode representing an entire program
     */
    createProgram: function (body) {
        return {
            type: astNodeTypes.Program,
            body: body
        };
    },

    /**
     * Create an ASTNode representation of an object property
     * @param {string} kind The type of property represented ("get", "set", etc.)
     * @param {ASTNode} key The property key
     * @param {ASTNode} value The new property value
     * @param {boolean} method True if the property is also a method (value is a function)
     * @param {boolean} shorthand True if the property is shorthand
     * @param {boolean} computed True if the property value has been computed
     * @returns {ASTNode} An ASTNode representing an object property
     */
    createProperty: function (kind, key, value, method, shorthand, computed) {
        return {
            type: astNodeTypes.Property,
            key: key,
            value: value,
            kind: kind,
            method: method,
            shorthand: shorthand,
            computed: computed
        };
    },

    /**
     * Create an ASTNode representation of a return statement
     * @param {?ASTNode} argument The return argument, null if no argument is provided
     * @returns {ASTNode} An ASTNode representing a return statement
     */
    createReturnStatement: function (argument) {
        return {
            type: astNodeTypes.ReturnStatement,
            argument: argument
        };
    },

    /**
     * Create an ASTNode representation of a sequence of expressions
     * @param {ASTNode[]} expressions An array containing each expression, in order
     * @returns {ASTNode} An ASTNode representing a sequence of expressions
     */
    createSequenceExpression: function (expressions) {
        return {
            type: astNodeTypes.SequenceExpression,
            expressions: expressions
        };
    },

    /**
     * Create an ASTNode representation of a switch case statement
     * @param {ASTNode} test The case value to test against the switch value
     * @param {ASTNode} consequent The consequent case statement
     * @returns {ASTNode} An ASTNode representing a switch case
     */
    createSwitchCase: function (test, consequent) {
        return {
            type: astNodeTypes.SwitchCase,
            test: test,
            consequent: consequent
        };
    },

    /**
     * Create an ASTNode representation of a switch statement
     * @param {ASTNode} discriminant An expression to test against each case value
     * @param {ASTNode[]} cases An array of switch case statements
     * @returns {ASTNode} An ASTNode representing a switch statement
     */
    createSwitchStatement: function (discriminant, cases) {
        return {
            type: astNodeTypes.SwitchStatement,
            discriminant: discriminant,
            cases: cases
        };
    },

    /**
     * Create an ASTNode representation of a this statement
     * @returns {ASTNode} An ASTNode representing a this statement
     */
    createThisExpression: function () {
        return {
            type: astNodeTypes.ThisExpression
        };
    },

    /**
     * Create an ASTNode representation of a throw statement
     * @param {ASTNode} argument The argument to throw
     * @returns {ASTNode} An ASTNode representing a throw statement
     */
    createThrowStatement: function (argument) {
        return {
            type: astNodeTypes.ThrowStatement,
            argument: argument
        };
    },

    /**
     * Create an ASTNode representation of a try statement
     * @param {ASTNode} block The try block
     * @param {ASTNode} handler A catch handler
     * @param {?ASTNode} finalizer The final code block to run after the try/catch has run
     * @returns {ASTNode} An ASTNode representing a try statement
     */
    createTryStatement: function (block, handler, finalizer) {
        return {
            type: astNodeTypes.TryStatement,
            block: block,
            guardedHandlers: [],
            handlers: handler ? [ handler ] : [],
            handler: handler,
            finalizer: finalizer
        };
    },

    /**
     * Create an ASTNode representation of a unary expression
     * @param {string} operator The unary operator
     * @param {ASTNode} argument The unary operand
     * @returns {ASTNode} An ASTNode representing a unary expression
     */
    createUnaryExpression: function (operator, argument) {
        if (operator === "++" || operator === "--") {
            return {
                type: astNodeTypes.UpdateExpression,
                operator: operator,
                argument: argument,
                prefix: true
            };
        }
        return {
            type: astNodeTypes.UnaryExpression,
            operator: operator,
            argument: argument,
            prefix: true
        };
    },

    /**
     * Create an ASTNode representation of a variable declaration
     * @param {ASTNode[]} declarations An array of variable declarations
     * @param {string} kind The kind of variable created ("var", "let", etc.)
     * @returns {ASTNode} An ASTNode representing a variable declaration
     */
    createVariableDeclaration: function (declarations, kind) {
        return {
            type: astNodeTypes.VariableDeclaration,
            declarations: declarations,
            kind: kind
        };
    },

    /**
     * Create an ASTNode representation of a variable declarator
     * @param {ASTNode} id The variable ID
     * @param {ASTNode} init The variable's initial value
     * @returns {ASTNode} An ASTNode representing a variable declarator
     */
    createVariableDeclarator: function (id, init) {
        return {
            type: astNodeTypes.VariableDeclarator,
            id: id,
            init: init
        };
    },

    /**
     * Create an ASTNode representation of a with statement
     * @param {ASTNode} object The with statement object expression
     * @param {ASTNode} body The with statement body
     * @returns {ASTNode} An ASTNode representing a with statement
     */
    createWithStatement: function (object, body) {
        return {
            type: astNodeTypes.WithStatement,
            object: object,
            body: body
        };
    },

    createYieldExpression: function (argument, delegate) {
        return {
            type: astNodeTypes.YieldExpression,
            argument: argument,
            delegate: delegate
        };
    },

    createJSXAttribute: function (name, value) {
        return {
            type: astNodeTypes.JSXAttribute,
            name: name,
            value: value || null
        };
    },

    createJSXSpreadAttribute: function (argument) {
        return {
            type: astNodeTypes.JSXSpreadAttribute,
            argument: argument
        };
    },

    createJSXIdentifier: function (name) {
        return {
            type: astNodeTypes.JSXIdentifier,
            name: name
        };
    },

    createJSXNamespacedName: function (namespace, name) {
        return {
            type: astNodeTypes.JSXNamespacedName,
            namespace: namespace,
            name: name
        };
    },

    createJSXMemberExpression: function (object, property) {
        return {
            type: astNodeTypes.JSXMemberExpression,
            object: object,
            property: property
        };
    },

    createJSXElement: function (openingElement, closingElement, children) {
        return {
            type: astNodeTypes.JSXElement,
            openingElement: openingElement,
            closingElement: closingElement,
            children: children
        };
    },

    createJSXEmptyExpression: function () {
        return {
            type: astNodeTypes.JSXEmptyExpression
        };
    },

    createJSXExpressionContainer: function (expression) {
        return {
            type: astNodeTypes.JSXExpressionContainer,
            expression: expression
        };
    },

    createJSXOpeningElement: function (name, attributes, selfClosing) {
        return {
            type: astNodeTypes.JSXOpeningElement,
            name: name,
            selfClosing: selfClosing,
            attributes: attributes
        };
    },

    createJSXClosingElement: function (name) {
        return {
            type: astNodeTypes.JSXClosingElement,
            name: name
        };
    },

    createExportSpecifier: function (local, exported) {
        return {
            type: astNodeTypes.ExportSpecifier,
            exported: exported || local,
            local: local
        };
    },

    createImportDefaultSpecifier: function (local) {
        return {
            type: astNodeTypes.ImportDefaultSpecifier,
            local: local
        };
    },

    createImportNamespaceSpecifier: function (local) {
        return {
            type: astNodeTypes.ImportNamespaceSpecifier,
            local: local
        };
    },

    createExportNamedDeclaration: function (declaration, specifiers, source) {
        return {
            type: astNodeTypes.ExportNamedDeclaration,
            declaration: declaration,
            specifiers: specifiers,
            source: source
        };
    },

    createExportDefaultDeclaration: function (declaration) {
        return {
            type: astNodeTypes.ExportDefaultDeclaration,
            declaration: declaration
        };
    },

    createExportAllDeclaration: function (source) {
        return {
            type: astNodeTypes.ExportAllDeclaration,
            source: source
        };
    },

    createImportSpecifier: function (local, imported) {
        return {
            type: astNodeTypes.ImportSpecifier,
            local: local || imported,
            imported: imported
        };
    },

    createImportDeclaration: function (specifiers, source) {
        return {
            type: astNodeTypes.ImportDeclaration,
            specifiers: specifiers,
            source: source
        };
    }

};

},{"./ast-node-types":2}],2:[function(require,module,exports){
/**
 * @fileoverview The AST node types produced by the parser.
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2011-2013 Ariya Hidayat <ariya.hidayat@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {
    AssignmentExpression: "AssignmentExpression",
    AssignmentPattern: "AssignmentPattern",
    ArrayExpression: "ArrayExpression",
    ArrayPattern: "ArrayPattern",
    ArrowFunctionExpression: "ArrowFunctionExpression",
    BlockStatement: "BlockStatement",
    BinaryExpression: "BinaryExpression",
    BreakStatement: "BreakStatement",
    CallExpression: "CallExpression",
    CatchClause: "CatchClause",
    ClassBody: "ClassBody",
    ClassDeclaration: "ClassDeclaration",
    ClassExpression: "ClassExpression",
    ConditionalExpression: "ConditionalExpression",
    ContinueStatement: "ContinueStatement",
    DoWhileStatement: "DoWhileStatement",
    DebuggerStatement: "DebuggerStatement",
    EmptyStatement: "EmptyStatement",
    ExpressionStatement: "ExpressionStatement",
    ForStatement: "ForStatement",
    ForInStatement: "ForInStatement",
    ForOfStatement: "ForOfStatement",
    FunctionDeclaration: "FunctionDeclaration",
    FunctionExpression: "FunctionExpression",
    Identifier: "Identifier",
    IfStatement: "IfStatement",
    Literal: "Literal",
    LabeledStatement: "LabeledStatement",
    LogicalExpression: "LogicalExpression",
    MemberExpression: "MemberExpression",
    MethodDefinition: "MethodDefinition",
    NewExpression: "NewExpression",
    ObjectExpression: "ObjectExpression",
    ObjectPattern: "ObjectPattern",
    Program: "Program",
    Property: "Property",
    ReturnStatement: "ReturnStatement",
    SequenceExpression: "SequenceExpression",
    SpreadElement: "SpreadElement",
    SwitchCase: "SwitchCase",
    SwitchStatement: "SwitchStatement",
    TaggedTemplateExpression: "TaggedTemplateExpression",
    TemplateElement: "TemplateElement",
    TemplateLiteral: "TemplateLiteral",
    ThisExpression: "ThisExpression",
    ThrowStatement: "ThrowStatement",
    TryStatement: "TryStatement",
    UnaryExpression: "UnaryExpression",
    UpdateExpression: "UpdateExpression",
    VariableDeclaration: "VariableDeclaration",
    VariableDeclarator: "VariableDeclarator",
    WhileStatement: "WhileStatement",
    WithStatement: "WithStatement",
    YieldExpression: "YieldExpression",
    JSXIdentifier: "JSXIdentifier",
    JSXNamespacedName: "JSXNamespacedName",
    JSXMemberExpression: "JSXMemberExpression",
    JSXEmptyExpression: "JSXEmptyExpression",
    JSXExpressionContainer: "JSXExpressionContainer",
    JSXElement: "JSXElement",
    JSXClosingElement: "JSXClosingElement",
    JSXOpeningElement: "JSXOpeningElement",
    JSXAttribute: "JSXAttribute",
    JSXSpreadAttribute: "JSXSpreadAttribute",
    JSXText: "JSXText",
    ExportDefaultDeclaration: "ExportDefaultDeclaration",
    ExportNamedDeclaration: "ExportNamedDeclaration",
    ExportAllDeclaration: "ExportAllDeclaration",
    ExportSpecifier: "ExportSpecifier",
    ImportDeclaration: "ImportDeclaration",
    ImportSpecifier: "ImportSpecifier",
    ImportDefaultSpecifier: "ImportDefaultSpecifier",
    ImportNamespaceSpecifier: "ImportNamespaceSpecifier"
};

},{}],3:[function(require,module,exports){
/**
 * @fileoverview Attaches comments to the AST.
 * @author Nicholas C. Zakas
 * @copyright 2015 Nicholas C. Zakas. All rights reserved.
 * @copyright 2011-2013 Ariya Hidayat <ariya.hidayat@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var astNodeTypes = require("./ast-node-types");

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var extra = {
        trailingComments: [],
        leadingComments: [],
        bottomRightStack: []
    };

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    reset: function() {
        extra.trailingComments = [];
        extra.leadingComments = [];
        extra.bottomRightStack = [];
    },

    addComment: function(comment) {
        extra.trailingComments.push(comment);
        extra.leadingComments.push(comment);
    },

    processComment: function(node) {
        var lastChild,
            trailingComments,
            i;

        if (node.type === astNodeTypes.Program) {
            if (node.body.length > 0) {
                return;
            }
        }

        if (extra.trailingComments.length > 0) {

            /*
             * If the first comment in trailingComments comes after the
             * current node, then we're good - all comments in the array will
             * come after the node and so it's safe to add then as official
             * trailingComments.
             */
            if (extra.trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.trailingComments;
                extra.trailingComments = [];
            } else {

                /*
                 * Otherwise, if the first comment doesn't come after the
                 * current node, that means we have a mix of leading and trailing
                 * comments in the array and that leadingComments contains the
                 * same items as trailingComments. Reset trailingComments to
                 * zero items and we'll handle this by evaluating leadingComments
                 * later.
                 */
                extra.trailingComments.length = 0;
            }
        } else {
            if (extra.bottomRightStack.length > 0 &&
                    extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments &&
                    extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
            }
        }

        // Eating the stack.
        while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
            lastChild = extra.bottomRightStack.pop();
        }

        if (lastChild) {
            if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = lastChild.leadingComments;
                delete lastChild.leadingComments;
            }
        } else if (extra.leadingComments.length > 0) {

            if (extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = extra.leadingComments;
                extra.leadingComments = [];
            } else {

                // https://github.com/eslint/espree/issues/2

                /*
                 * In special cases, such as return (without a value) and
                 * debugger, all comments will end up as leadingComments and
                 * will otherwise be eliminated. This extra step runs when the
                 * bottomRightStack is empty and there are comments left
                 * in leadingComments.
                 *
                 * This loop figures out the stopping point between the actual
                 * leading and trailing comments by finding the location of the
                 * first comment that comes after the given node.
                 */
                for (i = 0; i < extra.leadingComments.length; i++) {
                    if (extra.leadingComments[i].range[1] > node.range[0]) {
                        break;
                    }
                }

                /*
                 * Split the array based on the location of the first comment
                 * that comes after the node. Keep in mind that this could
                 * result in an empty array, and if so, the array must be
                 * deleted.
                 */
                node.leadingComments = extra.leadingComments.slice(0, i);
                if (node.leadingComments.length === 0) {
                    delete node.leadingComments;
                }

                /*
                 * Similarly, trailing comments are attached later. The variable
                 * must be reset to null if there are no trailing comments.
                 */
                trailingComments = extra.leadingComments.slice(i);
                if (trailingComments.length === 0) {
                    trailingComments = null;
                }
            }
        }

        if (trailingComments) {
            node.trailingComments = trailingComments;
        }

        extra.bottomRightStack.push(node);
    }

};

},{"./ast-node-types":2}],4:[function(require,module,exports){
/**
 * @fileoverview The list of feature flags supported by the parser and their default
 *      settings.
 * @author Nicholas C. Zakas
 * @copyright 2015 Fred K. Schott. All rights reserved.
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    // enable parsing of arrow functions
    arrowFunctions: false,

    // enable parsing of let and const
    blockBindings: true,

    // enable parsing of destructured arrays and objects
    destructuring: false,

    // enable parsing of regex u flag
    regexUFlag: false,

    // enable parsing of regex y flag
    regexYFlag: false,

    // enable parsing of template strings
    templateStrings: false,

    // enable parsing binary literals
    binaryLiterals: false,

    // enable parsing ES6 octal literals
    octalLiterals: false,

    // enable parsing unicode code point escape sequences
    unicodeCodePointEscapes: true,

    // enable parsing of default parameters
    defaultParams: false,

    // enable parsing of rest parameters
    restParams: false,

    // enable parsing of for-of statements
    forOf: false,

    // enable parsing computed object literal properties
    objectLiteralComputedProperties: false,

    // enable parsing of shorthand object literal methods
    objectLiteralShorthandMethods: false,

    // enable parsing of shorthand object literal properties
    objectLiteralShorthandProperties: false,

    // Allow duplicate object literal properties (except '__proto__')
    objectLiteralDuplicateProperties: false,

    // enable parsing of generators/yield
    generators: false,

    // support the spread operator
    spread: false,

    // enable super in functions
    superInFunctions: false,

    // enable parsing of classes
    classes: false,

    // enable parsing of modules
    modules: false,

    // React JSX parsing
    jsx: false,

    // allow return statement in global scope
    globalReturn: false
};

},{}],5:[function(require,module,exports){
/**
 * @fileoverview Error messages returned by the parser.
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2011-2013 Ariya Hidayat <ariya.hidayat@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

// error messages should be identical to V8 where possible
module.exports = {
    UnexpectedToken: "Unexpected token %0",
    UnexpectedNumber: "Unexpected number",
    UnexpectedString: "Unexpected string",
    UnexpectedIdentifier: "Unexpected identifier",
    UnexpectedReserved: "Unexpected reserved word",
    UnexpectedTemplate: "Unexpected quasi %0",
    UnexpectedEOS: "Unexpected end of input",
    NewlineAfterThrow: "Illegal newline after throw",
    InvalidRegExp: "Invalid regular expression",
    InvalidRegExpFlag: "Invalid regular expression flag",
    UnterminatedRegExp: "Invalid regular expression: missing /",
    InvalidLHSInAssignment: "Invalid left-hand side in assignment",
    InvalidLHSInFormalsList: "Invalid left-hand side in formals list",
    InvalidLHSInForIn: "Invalid left-hand side in for-in",
    MultipleDefaultsInSwitch: "More than one default clause in switch statement",
    NoCatchOrFinally: "Missing catch or finally after try",
    NoUnintializedConst: "Const must be initialized",
    UnknownLabel: "Undefined label '%0'",
    Redeclaration: "%0 '%1' has already been declared",
    IllegalContinue: "Illegal continue statement",
    IllegalBreak: "Illegal break statement",
    IllegalReturn: "Illegal return statement",
    IllegalYield: "Illegal yield expression",
    IllegalSpread: "Illegal spread element",
    StrictModeWith: "Strict mode code may not include a with statement",
    StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
    StrictVarName: "Variable name may not be eval or arguments in strict mode",
    StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
    StrictParamDupe: "Strict mode function may not have duplicate parameter names",
    ParameterAfterRestParameter: "Rest parameter must be final parameter of an argument list",
    DefaultRestParameter: "Rest parameter can not have a default value",
    ElementAfterSpreadElement: "Spread must be the final element of an element list",
    ObjectPatternAsRestParameter: "Invalid rest parameter",
    ObjectPatternAsSpread: "Invalid spread argument",
    StrictFunctionName: "Function name may not be eval or arguments in strict mode",
    StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
    StrictDelete: "Delete of an unqualified identifier in strict mode.",
    StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode",
    DuplicatePrototypeProperty: "Duplicate '__proto__' property in object literal are not allowed",
    ConstructorSpecialMethod: "Class constructor may not be an accessor",
    DuplicateConstructor: "A class may only have one constructor",
    StaticPrototype: "Classes may not have static property named prototype",
    AccessorDataProperty: "Object literal may not have data and accessor property with the same name",
    AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name",
    StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
    StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
    StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
    StrictReservedWord: "Use of future reserved word in strict mode",
    InvalidJSXAttributeValue: "JSX value should be either an expression or a quoted JSX text",
    ExpectedJSXClosingTag: "Expected corresponding JSX closing tag for %0",
    AdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag",
    MissingFromClause: "Missing from clause",
    NoAsAfterImportNamespace: "Missing as after import *",
    InvalidModuleSpecifier: "Invalid module specifier",
    IllegalImportDeclaration: "Illegal import declaration",
    IllegalExportDeclaration: "Illegal export declaration"
};

},{}],6:[function(require,module,exports){
/**
 * @fileoverview A simple map that helps avoid collisions on the Object prototype.
 * @author Jamund Ferguson
 * @copyright 2015 Jamund Ferguson. All rights reserved.
 * @copyright 2011-2013 Ariya Hidayat <ariya.hidayat@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

function StringMap() {
    this.$data = {};
}

StringMap.prototype.get = function (key) {
    key = "$" + key;
    return this.$data[key];
};

StringMap.prototype.set = function (key, value) {
    key = "$" + key;
    this.$data[key] = value;
    return this;
};

StringMap.prototype.has = function (key) {
    key = "$" + key;
    return Object.prototype.hasOwnProperty.call(this.$data, key);
};

StringMap.prototype.delete = function (key) {
    key = "$" + key;
    return delete this.$data[key];
};

module.exports = StringMap;

},{}],7:[function(require,module,exports){
/**
 * @fileoverview Various syntax/pattern checks for parsing.
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2011-2013 Ariya Hidayat <ariya.hidayat@gmail.com>
 * @copyright 2012-2013 Mathias Bynens <mathias@qiwi.be>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

// See also tools/generate-identifier-regex.js.
var Regex = {
    NonAsciiIdentifierStart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]"),
    NonAsciiIdentifierPart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]"),
    LeadingZeros: new RegExp("^0+(?!$)")
};

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    Regex: Regex,

    isDecimalDigit: function(ch) {
        return (ch >= 48 && ch <= 57);   // 0..9
    },

    isHexDigit: function(ch) {
        return "0123456789abcdefABCDEF".indexOf(ch) >= 0;
    },

    isOctalDigit: function(ch) {
        return "01234567".indexOf(ch) >= 0;
    },

    // 7.2 White Space

    isWhiteSpace: function(ch) {
        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
            (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
    },

    // 7.3 Line Terminators

    isLineTerminator: function(ch) {
        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
    },

    // 7.6 Identifier Names and Identifiers

    isIdentifierStart: function(ch) {
        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
            (ch === 0x5C) ||                      // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    },

    isIdentifierPart: function(ch) {
        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
            (ch >= 0x30 && ch <= 0x39) ||         // 0..9
            (ch === 0x5C) ||                      // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    },

    // 7.6.1.2 Future Reserved Words

    isFutureReservedWord: function(id) {
        switch (id) {
            case "class":
            case "enum":
            case "export":
            case "extends":
            case "import":
            case "super":
                return true;
            default:
                return false;
        }
    },

    isStrictModeReservedWord: function(id) {
        switch (id) {
            case "implements":
            case "interface":
            case "package":
            case "private":
            case "protected":
            case "public":
            case "static":
            case "yield":
            case "let":
                return true;
            default:
                return false;
        }
    },

    isRestrictedWord: function(id) {
        return id === "eval" || id === "arguments";
    },

    // 7.6.1.1 Keywords

    isKeyword: function(id, strict, ecmaFeatures) {

        if (strict && this.isStrictModeReservedWord(id)) {
            return true;
        }

        // "const" is specialized as Keyword in V8.
        // "yield" and "let" are for compatiblity with SpiderMonkey and ES.next.
        // Some others are from future reserved words.

        switch (id.length) {
            case 2:
                return (id === "if") || (id === "in") || (id === "do");
            case 3:
                return (id === "var") || (id === "for") || (id === "new") ||
                    (id === "try") || (id === "let");
            case 4:
                return (id === "this") || (id === "else") || (id === "case") ||
                    (id === "void") || (id === "with") || (id === "enum");
            case 5:
                return (id === "while") || (id === "break") || (id === "catch") ||
                    (id === "throw") || (id === "const") || (!ecmaFeatures.generators && id === "yield") ||
                    (id === "class") || (id === "super");
            case 6:
                return (id === "return") || (id === "typeof") || (id === "delete") ||
                    (id === "switch") || (id === "export") || (id === "import");
            case 7:
                return (id === "default") || (id === "finally") || (id === "extends");
            case 8:
                return (id === "function") || (id === "continue") || (id === "debugger");
            case 10:
                return (id === "instanceof");
            default:
                return false;
        }
    },

    isJSXIdentifierStart: function(ch) {
        // exclude backslash (\)
        return (ch !== 92) && this.isIdentifierStart(ch);
    },

    isJSXIdentifierPart: function(ch) {
        // exclude backslash (\) and add hyphen (-)
        return (ch !== 92) && (ch === 45 || this.isIdentifierPart(ch));
    }


};

},{}],8:[function(require,module,exports){
/**
 * @fileoverview Contains token information.
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
 * @copyright 2011-2013 Ariya Hidayat <ariya.hidayat@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var Token = {
    BooleanLiteral: 1,
    EOF: 2,
    Identifier: 3,
    Keyword: 4,
    NullLiteral: 5,
    NumericLiteral: 6,
    Punctuator: 7,
    StringLiteral: 8,
    RegularExpression: 9,
    Template: 10,
    JSXIdentifier: 11,
    JSXText: 12
};

var TokenName = {};
TokenName[Token.BooleanLiteral] = "Boolean";
TokenName[Token.EOF] = "<end>";
TokenName[Token.Identifier] = "Identifier";
TokenName[Token.Keyword] = "Keyword";
TokenName[Token.NullLiteral] = "Null";
TokenName[Token.NumericLiteral] = "Numeric";
TokenName[Token.Punctuator] = "Punctuator";
TokenName[Token.StringLiteral] = "String";
TokenName[Token.RegularExpression] = "RegularExpression";
TokenName[Token.Template] = "Template";
TokenName[Token.JSXIdentifier] = "JSXIdentifier";
TokenName[Token.JSXText] = "JSXText";

// A function following one of those tokens is an expression.
var FnExprTokens = ["(", "{", "[", "in", "typeof", "instanceof", "new",
                "return", "case", "delete", "throw", "void",
                // assignment operators
                "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
                "&=", "|=", "^=", ",",
                // binary/unary operators
                "+", "-", "*", "/", "%", "++", "--", "<<", ">>", ">>>", "&",
                "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=",
                "<=", "<", ">", "!=", "!=="];


//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {
    Token: Token,
    TokenName: TokenName,
    FnExprTokens: FnExprTokens
};

},{}],9:[function(require,module,exports){
/**
 * @fileoverview The list of XHTML entities that are valid in JSX.
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {
    quot: "\u0022",
    amp: "&",
    apos: "\u0027",
    lt: "<",
    gt: ">",
    nbsp: "\u00A0",
    iexcl: "\u00A1",
    cent: "\u00A2",
    pound: "\u00A3",
    curren: "\u00A4",
    yen: "\u00A5",
    brvbar: "\u00A6",
    sect: "\u00A7",
    uml: "\u00A8",
    copy: "\u00A9",
    ordf: "\u00AA",
    laquo: "\u00AB",
    not: "\u00AC",
    shy: "\u00AD",
    reg: "\u00AE",
    macr: "\u00AF",
    deg: "\u00B0",
    plusmn: "\u00B1",
    sup2: "\u00B2",
    sup3: "\u00B3",
    acute: "\u00B4",
    micro: "\u00B5",
    para: "\u00B6",
    middot: "\u00B7",
    cedil: "\u00B8",
    sup1: "\u00B9",
    ordm: "\u00BA",
    raquo: "\u00BB",
    frac14: "\u00BC",
    frac12: "\u00BD",
    frac34: "\u00BE",
    iquest: "\u00BF",
    Agrave: "\u00C0",
    Aacute: "\u00C1",
    Acirc: "\u00C2",
    Atilde: "\u00C3",
    Auml: "\u00C4",
    Aring: "\u00C5",
    AElig: "\u00C6",
    Ccedil: "\u00C7",
    Egrave: "\u00C8",
    Eacute: "\u00C9",
    Ecirc: "\u00CA",
    Euml: "\u00CB",
    Igrave: "\u00CC",
    Iacute: "\u00CD",
    Icirc: "\u00CE",
    Iuml: "\u00CF",
    ETH: "\u00D0",
    Ntilde: "\u00D1",
    Ograve: "\u00D2",
    Oacute: "\u00D3",
    Ocirc: "\u00D4",
    Otilde: "\u00D5",
    Ouml: "\u00D6",
    times: "\u00D7",
    Oslash: "\u00D8",
    Ugrave: "\u00D9",
    Uacute: "\u00DA",
    Ucirc: "\u00DB",
    Uuml: "\u00DC",
    Yacute: "\u00DD",
    THORN: "\u00DE",
    szlig: "\u00DF",
    agrave: "\u00E0",
    aacute: "\u00E1",
    acirc: "\u00E2",
    atilde: "\u00E3",
    auml: "\u00E4",
    aring: "\u00E5",
    aelig: "\u00E6",
    ccedil: "\u00E7",
    egrave: "\u00E8",
    eacute: "\u00E9",
    ecirc: "\u00EA",
    euml: "\u00EB",
    igrave: "\u00EC",
    iacute: "\u00ED",
    icirc: "\u00EE",
    iuml: "\u00EF",
    eth: "\u00F0",
    ntilde: "\u00F1",
    ograve: "\u00F2",
    oacute: "\u00F3",
    ocirc: "\u00F4",
    otilde: "\u00F5",
    ouml: "\u00F6",
    divide: "\u00F7",
    oslash: "\u00F8",
    ugrave: "\u00F9",
    uacute: "\u00FA",
    ucirc: "\u00FB",
    uuml: "\u00FC",
    yacute: "\u00FD",
    thorn: "\u00FE",
    yuml: "\u00FF",
    OElig: "\u0152",
    oelig: "\u0153",
    Scaron: "\u0160",
    scaron: "\u0161",
    Yuml: "\u0178",
    fnof: "\u0192",
    circ: "\u02C6",
    tilde: "\u02DC",
    Alpha: "\u0391",
    Beta: "\u0392",
    Gamma: "\u0393",
    Delta: "\u0394",
    Epsilon: "\u0395",
    Zeta: "\u0396",
    Eta: "\u0397",
    Theta: "\u0398",
    Iota: "\u0399",
    Kappa: "\u039A",
    Lambda: "\u039B",
    Mu: "\u039C",
    Nu: "\u039D",
    Xi: "\u039E",
    Omicron: "\u039F",
    Pi: "\u03A0",
    Rho: "\u03A1",
    Sigma: "\u03A3",
    Tau: "\u03A4",
    Upsilon: "\u03A5",
    Phi: "\u03A6",
    Chi: "\u03A7",
    Psi: "\u03A8",
    Omega: "\u03A9",
    alpha: "\u03B1",
    beta: "\u03B2",
    gamma: "\u03B3",
    delta: "\u03B4",
    epsilon: "\u03B5",
    zeta: "\u03B6",
    eta: "\u03B7",
    theta: "\u03B8",
    iota: "\u03B9",
    kappa: "\u03BA",
    lambda: "\u03BB",
    mu: "\u03BC",
    nu: "\u03BD",
    xi: "\u03BE",
    omicron: "\u03BF",
    pi: "\u03C0",
    rho: "\u03C1",
    sigmaf: "\u03C2",
    sigma: "\u03C3",
    tau: "\u03C4",
    upsilon: "\u03C5",
    phi: "\u03C6",
    chi: "\u03C7",
    psi: "\u03C8",
    omega: "\u03C9",
    thetasym: "\u03D1",
    upsih: "\u03D2",
    piv: "\u03D6",
    ensp: "\u2002",
    emsp: "\u2003",
    thinsp: "\u2009",
    zwnj: "\u200C",
    zwj: "\u200D",
    lrm: "\u200E",
    rlm: "\u200F",
    ndash: "\u2013",
    mdash: "\u2014",
    lsquo: "\u2018",
    rsquo: "\u2019",
    sbquo: "\u201A",
    ldquo: "\u201C",
    rdquo: "\u201D",
    bdquo: "\u201E",
    dagger: "\u2020",
    Dagger: "\u2021",
    bull: "\u2022",
    hellip: "\u2026",
    permil: "\u2030",
    prime: "\u2032",
    Prime: "\u2033",
    lsaquo: "\u2039",
    rsaquo: "\u203A",
    oline: "\u203E",
    frasl: "\u2044",
    euro: "\u20AC",
    image: "\u2111",
    weierp: "\u2118",
    real: "\u211C",
    trade: "\u2122",
    alefsym: "\u2135",
    larr: "\u2190",
    uarr: "\u2191",
    rarr: "\u2192",
    darr: "\u2193",
    harr: "\u2194",
    crarr: "\u21B5",
    lArr: "\u21D0",
    uArr: "\u21D1",
    rArr: "\u21D2",
    dArr: "\u21D3",
    hArr: "\u21D4",
    forall: "\u2200",
    part: "\u2202",
    exist: "\u2203",
    empty: "\u2205",
    nabla: "\u2207",
    isin: "\u2208",
    notin: "\u2209",
    ni: "\u220B",
    prod: "\u220F",
    sum: "\u2211",
    minus: "\u2212",
    lowast: "\u2217",
    radic: "\u221A",
    prop: "\u221D",
    infin: "\u221E",
    ang: "\u2220",
    and: "\u2227",
    or: "\u2228",
    cap: "\u2229",
    cup: "\u222A",
    "int": "\u222B",
    there4: "\u2234",
    sim: "\u223C",
    cong: "\u2245",
    asymp: "\u2248",
    ne: "\u2260",
    equiv: "\u2261",
    le: "\u2264",
    ge: "\u2265",
    sub: "\u2282",
    sup: "\u2283",
    nsub: "\u2284",
    sube: "\u2286",
    supe: "\u2287",
    oplus: "\u2295",
    otimes: "\u2297",
    perp: "\u22A5",
    sdot: "\u22C5",
    lceil: "\u2308",
    rceil: "\u2309",
    lfloor: "\u230A",
    rfloor: "\u230B",
    lang: "\u2329",
    rang: "\u232A",
    loz: "\u25CA",
    spades: "\u2660",
    clubs: "\u2663",
    hearts: "\u2665",
    diams: "\u2666"
};

},{}],10:[function(require,module,exports){
module.exports={
  "name": "espree",
  "description": "An actively-maintained fork of Esprima, the ECMAScript parsing infrastructure for multipurpose analysis",
  "author": {
    "name": "Nicholas C. Zakas",
    "email": "nicholas+npm@nczconsulting.com"
  },
  "homepage": "https://github.com/eslint/espree",
  "main": "espree.js",
  "bin": {
    "esparse": "./bin/esparse.js",
    "esvalidate": "./bin/esvalidate.js"
  },
  "version": "1.11.0",
  "files": [
    "bin",
    "lib",
    "test/run.js",
    "test/runner.js",
    "test/test.js",
    "test/compat.js",
    "test/reflect.js",
    "espree.js"
  ],
  "engines": {
    "node": ">=0.10.0"
  },
  "repository": {
    "type": "git",
    "url": "http://github.com/eslint/espree.git"
  },
  "bugs": {
    "url": "http://github.com/eslint/espree.git"
  },
  "licenses": [
    {
      "type": "BSD",
      "url": "http://github.com/nzakas/espree/raw/master/LICENSE"
    }
  ],
  "devDependencies": {
    "browserify": "^7.0.0",
    "chai": "^1.10.0",
    "complexity-report": "~0.6.1",
    "dateformat": "^1.0.11",
    "eslint": "^0.9.2",
    "esprima": "git://github.com/ariya/esprima#harmony",
    "esprima-fb": "^8001.2001.0-dev-harmony-fb",
    "istanbul": "~0.2.6",
    "json-diff": "~0.3.1",
    "leche": "^1.0.1",
    "mocha": "^2.0.1",
    "npm-license": "^0.2.3",
    "optimist": "~0.6.0",
    "regenerate": "~0.5.4",
    "semver": "^4.1.1",
    "shelljs": "^0.3.0",
    "shelljs-nodecli": "^0.1.1",
    "unicode-6.3.0": "~0.1.0"
  },
  "keywords": [
    "ast",
    "ecmascript",
    "javascript",
    "parser",
    "syntax"
  ],
  "scripts": {
    "generate-regex": "node tools/generate-identifier-regex.js",
    "test": "npm run-script lint && node Makefile.js test && node test/run.js",
    "lint": "node Makefile.js lint",
    "patch": "node Makefile.js patch",
    "minor": "node Makefile.js minor",
    "major": "node Makefile.js major",
    "browserify": "node Makefile.js browserify",
    "coverage": "npm run-script analyze-coverage && npm run-script check-coverage",
    "analyze-coverage": "node node_modules/istanbul/lib/cli.js cover test/runner.js",
    "check-coverage": "node node_modules/istanbul/lib/cli.js check-coverage --statement 99 --branch 99 --function 99",
    "complexity": "npm run-script analyze-complexity && npm run-script check-complexity",
    "analyze-complexity": "node tools/list-complexity.js",
    "check-complexity": "node node_modules/complexity-report/src/cli.js --maxcc 14 --silent -l -w espree.js",
    "benchmark": "node test/benchmarks.js",
    "benchmark-quick": "node test/benchmarks.js quick"
  },
  "dependencies": {},
  "gitHead": "06fdcd69a6a6006a635910c8c80baaab931cb0cd",
  "readme": "# Espree\n\nEspree is an actively-maintained fork Esprima, a high performance,\nstandard-compliant [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)\nparser written in ECMAScript (also popularly known as\n[JavaScript](http://en.wikipedia.org/wiki/JavaScript)).\n\n## Features\n\n- Full support for ECMAScript 5.1 ([ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm))\n- Sensible syntax tree format compatible with Mozilla\n[Parser AST](https://developer.mozilla.org/en/SpiderMonkey/Parser_API)\n- Optional tracking of syntax node location (index-based and line-column)\n- Heavily tested (> 650 unit tests) with full code coverage\n\n## Usage\n\nInstall:\n\n```\nnpm i espree --save\n```\n\nAnd in your Node.js code:\n\n```javascript\nvar espree = require(\"espree\");\n\nvar ast = espree.parse(code);\n```\n\nThere is a second argument to `parse()` that allows you to specify various options:\n\n```javascript\nvar espree = require(\"espree\");\n\nvar ast = espree.parse(code, {\n\n    // attach range information to each node\n    range: true,\n\n    // attach line/column location information to each node\n    loc: true,\n\n    // create a top-level comments array containing all comments\n    comments: true,\n\n    // attach comments to the closest relevant node as leadingComments and\n    // trailingComments\n    attachComment: true,\n\n    // create a top-level tokens array containing all tokens\n    tokens: true,\n\n    // try to continue parsing if an error is encountered, store errors in a\n    // top-level errors array\n    tolerant: true,\n\n    // specify parsing features (default only has blockBindings: true)\n    ecmaFeatures: {\n\n        // enable parsing of arrow functions\n        arrowFunctions: true,\n\n        // enable parsing of let/const\n        blockBindings: true,\n\n        // enable parsing of destructured arrays and objects\n        destructuring: true,\n\n        // enable parsing of regular expression y flag\n        regexYFlag: true,\n\n        // enable parsing of regular expression u flag\n        regexUFlag: true,\n\n        // enable parsing of template strings\n        templateStrings: true,\n\n        // enable parsing of binary literals\n        binaryLiterals: true,\n\n        // enable parsing of ES6 octal literals\n        octalLiterals: true,\n\n        // enable parsing unicode code point escape sequences\n        unicodeCodePointEscapes: true,\n\n        // enable parsing of default parameters\n        defaultParams: true,\n\n        // enable parsing of rest parameters\n        restParams: true,\n\n        // enable parsing of for-of statement\n        forOf: true,\n\n        // enable parsing computed object literal properties\n        objectLiteralComputedProperties: true,\n\n        // enable parsing of shorthand object literal methods\n        objectLiteralShorthandMethods: true,\n\n        // enable parsing of shorthand object literal properties\n        objectLiteralShorthandProperties: true,\n\n        // Allow duplicate object literal properties (except '__proto__')\n        objectLiteralDuplicateProperties: true,\n\n        // enable parsing of generators/yield\n        generators: true,\n\n        // enable parsing spread operator\n        spread: true,\n\n        // enable parsing classes\n        classes: true,\n\n        // enable parsing of modules\n        modules: true,\n\n        // enable React JSX parsing\n        jsx: true,\n\n        // enable return in global scope\n        globalReturn: true\n    }\n});\n```\n\n## Plans\n\nEspree starts as a fork of Esprima v1.2.2, the last stable published released of Esprima before work on ECMAScript 6 began. Espree's first version is therefore v1.2.2 and is 100% compatible with Esprima v1.2.2 as a drop-in replacement. The version number will be incremented based on [semantic versioning](http://semver.org/) as features and bug fixes are added.\n\nThe immediate plans are:\n\n1. Move away from giant files and move towards small, modular files that are easier to manage.\n1. Move towards CommonJS for all files and use browserify to create browser bundles.\n1. Support ECMAScript version filtering, allowing users to specify which version the parser should work in (similar to Acorn's `ecmaVersion` property).\n1. Add tests to track comment attachment.\n1. Add well-thought-out features that are useful for tools developers.\n1. Add full support for ECMAScript 6.\n1. Add optional parsing of JSX.\n\n## Esprima Compatibility Going Forward\n\nThe primary goal is to produce the exact same AST structure as Esprima and Acorn, and that takes precedence over anything else. (The AST structure being the SpiderMonkey Parser API with JSX extensions.) Separate from that, Espree may deviate from what Esprima outputs in terms of where and how comments are attached, as well as what additional information is available on AST nodes. That is to say, Espree may add more things to the AST nodes than Esprima does but the overall AST structure produced will be the same.\n\nEspree may also deviate from Esprima in the interface it exposes.\n\n## Frequent and Incremental Releases\n\nEspree will not do giant releases. Releases will happen periodically as changes are made and incremental releases will be made towards larger goals. For instance, we will not have one big release for ECMAScript 6 support. Instead, we will implement ECMAScript 6, piece-by-piece, hiding those pieces behind an `ecmaFeatures` property that allows you to opt-in to use those features.\n\n## Contributing\n\nIssues and pull requests will be triaged and responded to as quickly as possible. We operate under the [ESLint Contributor Guidelines](http://eslint.org/docs/developer-guide/contributing.html), so please be sure to read them before contributing. If you're not sure where to dig in, check out the [issues](https://github.com/eslint/espree/issues).\n\nEspree is licensed under a permissive BSD 3-clause license.\n\n## Build Commands\n\n* `npm test` - run all linting and tests\n* `npm run lint` - run all linting\n* `npm run browserify` - creates a version of Espree that is usable in a browser\n\n## Known Incompatibilities\n\nIn an effort to help those wanting to transition from other parsers to Espree, the following is a list of noteworthy incompatibilities with other parsers. These are known differences that we do not intend to change.\n\n### Esprima 1.2.2\n\n* None.\n\n### Esprima/Harmony Branch\n\n* Esprima/Harmony uses a different comment attachment algorithm that results in some comments being added in different places than Espree. The algorithm Espree uses is the same one used in Esprima 1.2.2.\n* Template tokens have a `head` property in addition to `tail`. Esprima has only `tail`.\n\n### Esprima-FB\n\n* All Esprima/Harmony incompatibilities.\n* Esprima-FB uses the term \"XJS\" to refer to its JSX support. This is seen primarily in the AST node types, such as `\"XJSElement\"`. Espree uses \"JSX\" to refer to JSX functionality, including AST node types. So, `\"XJSElement\"` in Esprima-FB is `\"JSXElement\"` in Espree (and the same is true for all JSX-related node types).\n\n## Frequently Asked Questions\n\n### Why are you forking Esprima?\n\n[ESLint](http://eslint.org) has been relying on Esprima as its parser from the beginning. While that was fine when the JavaScript language was evolving slowly, the pace of development has increased dramatically and Esprima has fallen behind. ESLint, like many other tools reliant on Esprima, has been stuck in using new JavaScript language features until Esprima updates, and that has caused our users frustration.\n\nWe decided the only way for us to move forward was to create our own parser, bringing us inline with JSHint and JSLint, and allowing us to keep implementing new features as we need them. We chose to fork Esprima instead of starting from scratch in order to move as quickly as possible with a compatible API.\n\n### Have you tried working with Esprima?\n\nYes. Since the start of ESLint, we've regularly filed bugs and feature requests with Esprima. Unfortunately, we've been unable to make much progress towards getting our needs addressed.\n\n### Why don't you just use Facebook's Esprima fork?\n\n`esprima-fb` is Facebook's Esprima fork that features JSX and Flow type annotations. We tried working with `esprima-fb` in our evaluation of how to support ECMAScript 6 and JSX in ESLint. Unfortunately, we were hampered by bugs that were part of Esprima (not necessarily Facebook's code). Since `esprima-fb` tracks the Esprima Harmony branch, that means we still were unable to get fixes or features we needed in a timely manner.\n\n### Why don't you just use Acorn?\n\nAcorn is a great JavaScript parser that produces an AST that is compatible with Esprima. Unfortunately, ESLint relies on more than just the AST to do its job. It relies on Esprima's tokens and comment attachment features to get a complete picture of the source code. We investigated switching to Acorn, but the inconsistencies between Esprima and Acorn created too much work for a project like ESLint.\n\nWe expect there are other tools like ESLint that rely on more than just the AST produced by Esprima, and so a drop-in replacement will help those projects as well as ESLint.\n\n### What ECMAScript 6 features do you support?\n\nPlease see the [tracking issue](https://github.com/eslint/espree/issues/10) for the most up-to-date information.\n\n### Why use Espree instead of Esprima?\n\n* Faster turnaround time on bug fixes\n* More frequent releases\n* Better communication and responsiveness to issues\n* Ongoing development\n\n### Why use Espree instead of Esprima-FB?\n\n* Opt-in to just the ECMAScript 6 features you want\n* JSX support is off by default, so you're not forced to use it to use ECMAScript 6\n* Stricter ECMAScript 6 support\n",
  "readmeFilename": "README.md",
  "_id": "espree@1.11.0",
  "_shasum": "862c3033fad49ea1f3c5446fbab7650d7759186b",
  "_from": "espree@latest"
}

},{}],"espree":[function(require,module,exports){
/*
Copyright (C) 2015 Fred K. Schott <fkschott@gmail.com>
Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*eslint no-undefined:0, no-use-before-define: 0*/

"use strict";

var syntax = require("./lib/syntax"),
    tokenInfo = require("./lib/token-info"),
    astNodeTypes = require("./lib/ast-node-types"),
    astNodeFactory = require("./lib/ast-node-factory"),
    defaultFeatures = require("./lib/features"),
    Messages = require("./lib/messages"),
    XHTMLEntities = require("./lib/xhtml-entities"),
    StringMap = require("./lib/string-map"),
    commentAttachment = require("./lib/comment-attachment");

var Token = tokenInfo.Token,
    TokenName = tokenInfo.TokenName,
    FnExprTokens = tokenInfo.FnExprTokens,
    Regex = syntax.Regex,
    PropertyKind,
    source,
    strict,
    index,
    lineNumber,
    lineStart,
    length,
    lookahead,
    state,
    extra;

PropertyKind = {
    Data: 1,
    Get: 2,
    Set: 4
};


// Ensure the condition is true, otherwise throw an error.
// This is only to have a better contract semantic, i.e. another safety net
// to catch a logic error. The condition shall be fulfilled in normal case.
// Do NOT use this to enforce a certain condition on any user input.

function assert(condition, message) {
    /* istanbul ignore if */
    if (!condition) {
        throw new Error("ASSERT: " + message);
    }
}

// 7.4 Comments

function addComment(type, value, start, end, loc) {
    var comment;

    assert(typeof start === "number", "Comment must have valid position");

    // Because the way the actual token is scanned, often the comments
    // (if any) are skipped twice during the lexical analysis.
    // Thus, we need to skip adding a comment if the comment array already
    // handled it.
    if (state.lastCommentStart >= start) {
        return;
    }
    state.lastCommentStart = start;

    comment = {
        type: type,
        value: value
    };
    if (extra.range) {
        comment.range = [start, end];
    }
    if (extra.loc) {
        comment.loc = loc;
    }
    extra.comments.push(comment);

    if (extra.attachComment) {
        commentAttachment.addComment(comment);
    }
}

function skipSingleLineComment(offset) {
    var start, loc, ch, comment;

    start = index - offset;
    loc = {
        start: {
            line: lineNumber,
            column: index - lineStart - offset
        }
    };

    while (index < length) {
        ch = source.charCodeAt(index);
        ++index;
        if (syntax.isLineTerminator(ch)) {
            if (extra.comments) {
                comment = source.slice(start + offset, index - 1);
                loc.end = {
                    line: lineNumber,
                    column: index - lineStart - 1
                };
                addComment("Line", comment, start, index - 1, loc);
            }
            if (ch === 13 && source.charCodeAt(index) === 10) {
                ++index;
            }
            ++lineNumber;
            lineStart = index;
            return;
        }
    }

    if (extra.comments) {
        comment = source.slice(start + offset, index);
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };
        addComment("Line", comment, start, index, loc);
    }
}

function skipMultiLineComment() {
    var start, loc, ch, comment;

    if (extra.comments) {
        start = index - 2;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart - 2
            }
        };
    }

    while (index < length) {
        ch = source.charCodeAt(index);
        if (syntax.isLineTerminator(ch)) {
            if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
                ++index;
            }
            ++lineNumber;
            ++index;
            lineStart = index;
            if (index >= length) {
                throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
        } else if (ch === 0x2A) {
            // Block comment ends with "*/".
            if (source.charCodeAt(index + 1) === 0x2F) {
                ++index;
                ++index;
                if (extra.comments) {
                    comment = source.slice(start + 2, index - 2);
                    loc.end = {
                        line: lineNumber,
                        column: index - lineStart
                    };
                    addComment("Block", comment, start, index, loc);
                }
                return;
            }
            ++index;
        } else {
            ++index;
        }
    }

    throwError({}, Messages.UnexpectedToken, "ILLEGAL");
}

function skipComment() {
    var ch, start;

    start = (index === 0);
    while (index < length) {
        ch = source.charCodeAt(index);

        if (syntax.isWhiteSpace(ch)) {
            ++index;
        } else if (syntax.isLineTerminator(ch)) {
            ++index;
            if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
                ++index;
            }
            ++lineNumber;
            lineStart = index;
            start = true;
        } else if (ch === 0x2F) { // U+002F is "/"
            ch = source.charCodeAt(index + 1);
            if (ch === 0x2F) {
                ++index;
                ++index;
                skipSingleLineComment(2);
                start = true;
            } else if (ch === 0x2A) {  // U+002A is "*"
                ++index;
                ++index;
                skipMultiLineComment();
            } else {
                break;
            }
        } else if (start && ch === 0x2D) { // U+002D is "-"
            // U+003E is ">"
            if ((source.charCodeAt(index + 1) === 0x2D) && (source.charCodeAt(index + 2) === 0x3E)) {
                // "-->" is a single-line comment
                index += 3;
                skipSingleLineComment(3);
            } else {
                break;
            }
        } else if (ch === 0x3C) { // U+003C is "<"
            if (source.slice(index + 1, index + 4) === "!--") {
                ++index; // `<`
                ++index; // `!`
                ++index; // `-`
                ++index; // `-`
                skipSingleLineComment(4);
            } else {
                break;
            }
        } else {
            break;
        }
    }
}

function scanHexEscape(prefix) {
    var i, len, ch, code = 0;

    len = (prefix === "u") ? 4 : 2;
    for (i = 0; i < len; ++i) {
        if (index < length && syntax.isHexDigit(source[index])) {
            ch = source[index++];
            code = code * 16 + "0123456789abcdef".indexOf(ch.toLowerCase());
        } else {
            return "";
        }
    }
    return String.fromCharCode(code);
}

/**
 * Scans an extended unicode code point escape sequence from source. Throws an
 * error if the sequence is empty or if the code point value is too large.
 * @returns {string} The string created by the Unicode escape sequence.
 * @private
 */
function scanUnicodeCodePointEscape() {
    var ch, code, cu1, cu2;

    ch = source[index];
    code = 0;

    // At least one hex digit is required.
    if (ch === "}") {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    while (index < length) {
        ch = source[index++];
        if (!syntax.isHexDigit(ch)) {
            break;
        }
        code = code * 16 + "0123456789abcdef".indexOf(ch.toLowerCase());
    }

    if (code > 0x10FFFF || ch !== "}") {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    // UTF-16 Encoding
    if (code <= 0xFFFF) {
        return String.fromCharCode(code);
    }
    cu1 = ((code - 0x10000) >> 10) + 0xD800;
    cu2 = ((code - 0x10000) & 1023) + 0xDC00;
    return String.fromCharCode(cu1, cu2);
}

function getEscapedIdentifier() {
    var ch, id;

    ch = source.charCodeAt(index++);
    id = String.fromCharCode(ch);

    // "\u" (U+005C, U+0075) denotes an escaped character.
    if (ch === 0x5C) {
        if (source.charCodeAt(index) !== 0x75) {
            throwError({}, Messages.UnexpectedToken, "ILLEGAL");
        }
        ++index;
        ch = scanHexEscape("u");
        if (!ch || ch === "\\" || !syntax.isIdentifierStart(ch.charCodeAt(0))) {
            throwError({}, Messages.UnexpectedToken, "ILLEGAL");
        }
        id = ch;
    }

    while (index < length) {
        ch = source.charCodeAt(index);
        if (!syntax.isIdentifierPart(ch)) {
            break;
        }
        ++index;
        id += String.fromCharCode(ch);

        // "\u" (U+005C, U+0075) denotes an escaped character.
        if (ch === 0x5C) {
            id = id.substr(0, id.length - 1);
            if (source.charCodeAt(index) !== 0x75) {
                throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
            ++index;
            ch = scanHexEscape("u");
            if (!ch || ch === "\\" || !syntax.isIdentifierPart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
            id += ch;
        }
    }

    return id;
}

function getIdentifier() {
    var start, ch;

    start = index++;
    while (index < length) {
        ch = source.charCodeAt(index);
        if (ch === 0x5C) {
            // Blackslash (U+005C) marks Unicode escape sequence.
            index = start;
            return getEscapedIdentifier();
        }
        if (syntax.isIdentifierPart(ch)) {
            ++index;
        } else {
            break;
        }
    }

    return source.slice(start, index);
}

function scanIdentifier() {
    var start, id, type;

    start = index;

    // Backslash (U+005C) starts an escaped character.
    id = (source.charCodeAt(index) === 0x5C) ? getEscapedIdentifier() : getIdentifier();

    // There is no keyword or literal with only one character.
    // Thus, it must be an identifier.
    if (id.length === 1) {
        type = Token.Identifier;
    } else if (syntax.isKeyword(id, strict, extra.ecmaFeatures)) {
        type = Token.Keyword;
    } else if (id === "null") {
        type = Token.NullLiteral;
    } else if (id === "true" || id === "false") {
        type = Token.BooleanLiteral;
    } else {
        type = Token.Identifier;
    }

    return {
        type: type,
        value: id,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}


// 7.7 Punctuators

function scanPunctuator() {
    var start = index,
        code = source.charCodeAt(index),
        code2,
        ch1 = source[index],
        ch2,
        ch3,
        ch4;

    switch (code) {
        // Check for most common single-character punctuators.
        case 40:   // ( open bracket
        case 41:   // ) close bracket
        case 59:   // ; semicolon
        case 44:   // , comma
        case 123:  // { open curly brace
        case 125:  // } close curly brace
        case 91:   // [
        case 93:   // ]
        case 58:   // :
        case 63:   // ?
        case 126:  // ~
            ++index;
            if (extra.tokenize) {
                if (code === 40) {
                    extra.openParenToken = extra.tokens.length;
                } else if (code === 123) {
                    extra.openCurlyToken = extra.tokens.length;
                }
            }
            return {
                type: Token.Punctuator,
                value: String.fromCharCode(code),
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };

        default:
            code2 = source.charCodeAt(index + 1);

            // "=" (char #61) marks an assignment or comparison operator.
            if (code2 === 61) {
                switch (code) {
                    case 37:  // %
                    case 38:  // &
                    case 42:  // *:
                    case 43:  // +
                    case 45:  // -
                    case 47:  // /
                    case 60:  // <
                    case 62:  // >
                    case 94:  // ^
                    case 124: // |
                        index += 2;
                        return {
                            type: Token.Punctuator,
                            value: String.fromCharCode(code) + String.fromCharCode(code2),
                            lineNumber: lineNumber,
                            lineStart: lineStart,
                            range: [start, index]
                        };

                    case 33: // !
                    case 61: // =
                        index += 2;

                        // !== and ===
                        if (source.charCodeAt(index) === 61) {
                            ++index;
                        }
                        return {
                            type: Token.Punctuator,
                            value: source.slice(start, index),
                            lineNumber: lineNumber,
                            lineStart: lineStart,
                            range: [start, index]
                        };
                    default:
                        break;
                }
            }
            break;
    }

    // Peek more characters.

    ch2 = source[index + 1];
    ch3 = source[index + 2];
    ch4 = source[index + 3];

    // 4-character punctuator: >>>=

    if (ch1 === ">" && ch2 === ">" && ch3 === ">") {
        if (ch4 === "=") {
            index += 4;
            return {
                type: Token.Punctuator,
                value: ">>>=",
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }
    }

    // 3-character punctuators: === !== >>> <<= >>=

    if (ch1 === ">" && ch2 === ">" && ch3 === ">") {
        index += 3;
        return {
            type: Token.Punctuator,
            value: ">>>",
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    if (ch1 === "<" && ch2 === "<" && ch3 === "=") {
        index += 3;
        return {
            type: Token.Punctuator,
            value: "<<=",
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    if (ch1 === ">" && ch2 === ">" && ch3 === "=") {
        index += 3;
        return {
            type: Token.Punctuator,
            value: ">>=",
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // The ... operator (spread, restParams, JSX, etc.)
    if (extra.ecmaFeatures.spread ||
        extra.ecmaFeatures.restParams ||
        (extra.ecmaFeatures.jsx && state.inJSXSpreadAttribute)
    ) {
        if (ch1 === "." && ch2 === "." && ch3 === ".") {
            index += 3;
            return {
                type: Token.Punctuator,
                value: "...",
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }
    }

    // Other 2-character punctuators: ++ -- << >> && ||
    if (ch1 === ch2 && ("+-<>&|".indexOf(ch1) >= 0)) {
        index += 2;
        return {
            type: Token.Punctuator,
            value: ch1 + ch2,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // the => for arrow functions
    if (extra.ecmaFeatures.arrowFunctions) {
        if (ch1 === "=" && ch2 === ">") {
            index += 2;
            return {
                type: Token.Punctuator,
                value: "=>",
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }
    }

    if ("<>=!+-*%&|^/".indexOf(ch1) >= 0) {
        ++index;
        return {
            type: Token.Punctuator,
            value: ch1,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    if (ch1 === ".") {
        ++index;
        return {
            type: Token.Punctuator,
            value: ch1,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    throwError({}, Messages.UnexpectedToken, "ILLEGAL");
}

// 7.8.3 Numeric Literals

function scanHexLiteral(start) {
    var number = "";

    while (index < length) {
        if (!syntax.isHexDigit(source[index])) {
            break;
        }
        number += source[index++];
    }

    if (number.length === 0) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    if (syntax.isIdentifierStart(source.charCodeAt(index))) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    return {
        type: Token.NumericLiteral,
        value: parseInt("0x" + number, 16),
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

function scanBinaryLiteral(start) {
    var ch, number = "";

    while (index < length) {
        ch = source[index];
        if (ch !== "0" && ch !== "1") {
            break;
        }
        number += source[index++];
    }

    if (number.length === 0) {
        // only 0b or 0B
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }


    if (index < length) {
        ch = source.charCodeAt(index);
        /* istanbul ignore else */
        if (syntax.isIdentifierStart(ch) || syntax.isDecimalDigit(ch)) {
            throwError({}, Messages.UnexpectedToken, "ILLEGAL");
        }
    }

    return {
        type: Token.NumericLiteral,
        value: parseInt(number, 2),
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

function scanOctalLiteral(prefix, start) {
    var number, octal;

    if (syntax.isOctalDigit(prefix)) {
        octal = true;
        number = "0" + source[index++];
    } else {
        octal = false;
        ++index;
        number = "";
    }

    while (index < length) {
        if (!syntax.isOctalDigit(source[index])) {
            break;
        }
        number += source[index++];
    }

    if (!octal && number.length === 0) {
        // only 0o or 0O
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    if (syntax.isIdentifierStart(source.charCodeAt(index)) || syntax.isDecimalDigit(source.charCodeAt(index))) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    return {
        type: Token.NumericLiteral,
        value: parseInt(number, 8),
        octal: octal,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

function scanNumericLiteral() {
    var number, start, ch;

    ch = source[index];
    assert(syntax.isDecimalDigit(ch.charCodeAt(0)) || (ch === "."),
        "Numeric literal must start with a decimal digit or a decimal point");

    start = index;
    number = "";
    if (ch !== ".") {
        number = source[index++];
        ch = source[index];

        // Hex number starts with "0x".
        // Octal number starts with "0".
        if (number === "0") {
            if (ch === "x" || ch === "X") {
                ++index;
                return scanHexLiteral(start);
            }

            // Binary number in ES6 starts with '0b'
            if (extra.ecmaFeatures.binaryLiterals) {
                if (ch === "b" || ch === "B") {
                    ++index;
                    return scanBinaryLiteral(start);
                }
            }

            if ((extra.ecmaFeatures.octalLiterals && (ch === "o" || ch === "O")) || syntax.isOctalDigit(ch)) {
                return scanOctalLiteral(ch, start);
            }

            // decimal number starts with "0" such as "09" is illegal.
            if (ch && syntax.isDecimalDigit(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
        }

        while (syntax.isDecimalDigit(source.charCodeAt(index))) {
            number += source[index++];
        }
        ch = source[index];
    }

    if (ch === ".") {
        number += source[index++];
        while (syntax.isDecimalDigit(source.charCodeAt(index))) {
            number += source[index++];
        }
        ch = source[index];
    }

    if (ch === "e" || ch === "E") {
        number += source[index++];

        ch = source[index];
        if (ch === "+" || ch === "-") {
            number += source[index++];
        }
        if (syntax.isDecimalDigit(source.charCodeAt(index))) {
            while (syntax.isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
        } else {
            throwError({}, Messages.UnexpectedToken, "ILLEGAL");
        }
    }

    if (syntax.isIdentifierStart(source.charCodeAt(index))) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    return {
        type: Token.NumericLiteral,
        value: parseFloat(number),
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

/**
 * Scan a string escape sequence and return its special character.
 * @param {string} ch The starting character of the given sequence.
 * @returns {Object} An object containing the character and a flag
 * if the escape sequence was an octal.
 * @private
 */
function scanEscapeSequence(ch) {
    var code,
        unescaped,
        restore,
        escapedCh,
        octal = false;

    // An escape sequence cannot be empty
    if (!ch) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    if (syntax.isLineTerminator(ch.charCodeAt(0))) {
        ++lineNumber;
        if (ch === "\r" && source[index] === "\n") {
            ++index;
        }
        lineStart = index;
        escapedCh = "";
    } else if (ch === "u" && source[index] === "{") {
        // Handle ES6 extended unicode code point escape sequences.
        if (extra.ecmaFeatures.unicodeCodePointEscapes) {
            ++index;
            escapedCh = scanUnicodeCodePointEscape();
        } else {
            throwError({}, Messages.UnexpectedToken, "ILLEGAL");
        }
    } else if (ch === "u" || ch === "x") {
        // Handle other unicode and hex codes normally
        restore = index;
        unescaped = scanHexEscape(ch);
        if (unescaped) {
            escapedCh = unescaped;
        } else {
            index = restore;
            escapedCh = ch;
        }
    } else if (ch === "n") {
        escapedCh = "\n";
    } else if (ch === "r") {
        escapedCh = "\r";
    } else if (ch === "t") {
        escapedCh = "\t";
    } else if (ch === "b") {
        escapedCh = "\b";
    } else if (ch === "f") {
        escapedCh = "\f";
    } else if (ch === "v") {
        escapedCh = "\v";
    } else if (syntax.isOctalDigit(ch)) {
        code = "01234567".indexOf(ch);

        // \0 is not octal escape sequence
        if (code !== 0) {
            octal = true;
        }

        if (index < length && syntax.isOctalDigit(source[index])) {
            octal = true;
            code = code * 8 + "01234567".indexOf(source[index++]);

            // 3 digits are only allowed when string starts with 0, 1, 2, 3
            if ("0123".indexOf(ch) >= 0 &&
                    index < length &&
                    syntax.isOctalDigit(source[index])) {
                code = code * 8 + "01234567".indexOf(source[index++]);
            }
        }
        escapedCh = String.fromCharCode(code);
    } else {
        escapedCh = ch;
    }

    return {
        ch: escapedCh,
        octal: octal
    };
}

function scanStringLiteral() {
    var str = "",
        ch,
        escapedSequence,
        octal = false,
        start = index,
        startLineNumber = lineNumber,
        startLineStart = lineStart,
        quote = source[index];

    assert((quote === "'" || quote === "\""),
        "String literal must starts with a quote");

    ++index;

    while (index < length) {
        ch = source[index++];

        if (syntax.isLineTerminator(ch.charCodeAt(0))) {
            break;
        } else if (ch === quote) {
            quote = "";
            break;
        } else if (ch === "\\") {
            ch = source[index++];
            escapedSequence = scanEscapeSequence(ch);
            str += escapedSequence.ch;
            octal = escapedSequence.octal || octal;
        } else {
            str += ch;
        }
    }

    if (quote !== "") {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    return {
        type: Token.StringLiteral,
        value: str,
        octal: octal,
        startLineNumber: startLineNumber,
        startLineStart: startLineStart,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

/**
 * Scan a template string and return a token. This scans both the first and
 * subsequent pieces of a template string and assumes that the first backtick
 * or the closing } have already been scanned.
 * @returns {Token} The template string token.
 * @private
 */
function scanTemplate() {
    var cooked = "",
        ch,
        escapedSequence,
        octal = false,
        start = index,
        terminated = false,
        tail = false,
        head = (source[index] === "`");

    ++index;

    while (index < length) {
        ch = source[index++];

        if (ch === "`") {
            tail = true;
            terminated = true;
            break;
        } else if (ch === "$") {
            if (source[index] === "{") {
                ++index;
                terminated = true;
                break;
            }
            cooked += ch;
        } else if (ch === "\\") {
            ch = source[index++];
            escapedSequence = scanEscapeSequence(ch);
            cooked += escapedSequence.ch;
            octal = escapedSequence.octal || octal;
        } else if (syntax.isLineTerminator(ch.charCodeAt(0))) {
            ++lineNumber;
            if (ch === "\r" && source[index] === "\n") {
                ++index;
            }
            lineStart = index;
            cooked += "\n";
        } else {
            cooked += ch;
        }
    }

    if (!terminated) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    return {
        type: Token.Template,
        value: {
            cooked: cooked,
            raw: source.slice(start + 1, index - ((tail) ? 1 : 2))
        },
        head: head,
        tail: tail,
        octal: octal,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

/**
 * Scan a template string element and return a ASTNode representation
 * @param {Object} options Scan options
 * @param {Object} options.head True if this element is the first in the
 *                               template string, false otherwise.
 * @returns {ASTNode} The template element node
 * @private
 */
function scanTemplateElement(options) {
    var startsWith, template;

    lookahead = null;
    skipComment();

    startsWith = (options.head) ? "`" : "}";

    if (source[index] !== startsWith) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    template = scanTemplate();

    if (!template.tail) {
        extra.curlies.push("template");
    }

    peek();

    return template;
}

function testRegExp(pattern, flags) {
    var tmp = pattern,
        validFlags = "gmsi";

    if (extra.ecmaFeatures.regexYFlag) {
        validFlags += "y";
    }

    if (extra.ecmaFeatures.regexUFlag) {
        validFlags += "u";
    }

    if (!RegExp("^[" + validFlags + "]*$").test(flags)) {
        throwError({}, Messages.InvalidRegExpFlag);
    }


    if (flags.indexOf("u") >= 0) {
        // Replace each astral symbol and every Unicode code point
        // escape sequence with a single ASCII symbol to avoid throwing on
        // regular expressions that are only valid in combination with the
        // `/u` flag.
        // Note: replacing with the ASCII symbol `x` might cause false
        // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
        // perfectly valid pattern that is equivalent to `[a-b]`, but it
        // would be replaced by `[x-b]` which throws an error.
        tmp = tmp
            .replace(/\\u\{([0-9a-fA-F]+)\}/g, function ($0, $1) {
                if (parseInt($1, 16) <= 0x10FFFF) {
                    return "x";
                }
                throwError({}, Messages.InvalidRegExp);
            })
            .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
    }

    // First, detect invalid regular expressions.
    try {
        RegExp(tmp);
    } catch (e) {
        throwError({}, Messages.InvalidRegExp);
    }

    // Return a regular expression object for this pattern-flag pair, or
    // `null` in case the current environment doesn't support the flags it
    // uses.
    try {
        return new RegExp(pattern, flags);
    } catch (exception) {
        return null;
    }
}

function scanRegExpBody() {
    var ch, str, classMarker, terminated, body;

    ch = source[index];
    assert(ch === "/", "Regular expression literal must start with a slash");
    str = source[index++];

    classMarker = false;
    terminated = false;
    while (index < length) {
        ch = source[index++];
        str += ch;
        if (ch === "\\") {
            ch = source[index++];
            // ECMA-262 7.8.5
            if (syntax.isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
            }
            str += ch;
        } else if (syntax.isLineTerminator(ch.charCodeAt(0))) {
            throwError({}, Messages.UnterminatedRegExp);
        } else if (classMarker) {
            if (ch === "]") {
                classMarker = false;
            }
        } else {
            if (ch === "/") {
                terminated = true;
                break;
            } else if (ch === "[") {
                classMarker = true;
            }
        }
    }

    if (!terminated) {
        throwError({}, Messages.UnterminatedRegExp);
    }

    // Exclude leading and trailing slash.
    body = str.substr(1, str.length - 2);
    return {
        value: body,
        literal: str
    };
}

function scanRegExpFlags() {
    var ch, str, flags, restore;

    str = "";
    flags = "";
    while (index < length) {
        ch = source[index];
        if (!syntax.isIdentifierPart(ch.charCodeAt(0))) {
            break;
        }

        ++index;
        if (ch === "\\" && index < length) {
            ch = source[index];
            if (ch === "u") {
                ++index;
                restore = index;
                ch = scanHexEscape("u");
                if (ch) {
                    flags += ch;
                    for (str += "\\u"; restore < index; ++restore) {
                        str += source[restore];
                    }
                } else {
                    index = restore;
                    flags += "u";
                    str += "\\u";
                }
                throwErrorTolerant({}, Messages.UnexpectedToken, "ILLEGAL");
            } else {
                str += "\\";
                throwErrorTolerant({}, Messages.UnexpectedToken, "ILLEGAL");
            }
        } else {
            flags += ch;
            str += ch;
        }
    }

    return {
        value: flags,
        literal: str
    };
}

function scanRegExp() {
    var start, body, flags, value;

    lookahead = null;
    skipComment();
    start = index;

    body = scanRegExpBody();
    flags = scanRegExpFlags();
    value = testRegExp(body.value, flags.value);

    if (extra.tokenize) {
        return {
            type: Token.RegularExpression,
            value: value,
            regex: {
                pattern: body.value,
                flags: flags.value
            },
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    return {
        literal: body.literal + flags.literal,
        value: value,
        regex: {
            pattern: body.value,
            flags: flags.value
        },
        range: [start, index]
    };
}

function collectRegex() {
    var pos, loc, regex, token;

    skipComment();

    pos = index;
    loc = {
        start: {
            line: lineNumber,
            column: index - lineStart
        }
    };

    regex = scanRegExp();
    loc.end = {
        line: lineNumber,
        column: index - lineStart
    };

    /* istanbul ignore next */
    if (!extra.tokenize) {
        // Pop the previous token, which is likely "/" or "/="
        if (extra.tokens.length > 0) {
            token = extra.tokens[extra.tokens.length - 1];
            if (token.range[0] === pos && token.type === "Punctuator") {
                if (token.value === "/" || token.value === "/=") {
                    extra.tokens.pop();
                }
            }
        }

        extra.tokens.push({
            type: "RegularExpression",
            value: regex.literal,
            regex: regex.regex,
            range: [pos, index],
            loc: loc
        });
    }

    return regex;
}

function isIdentifierName(token) {
    return token.type === Token.Identifier ||
        token.type === Token.Keyword ||
        token.type === Token.BooleanLiteral ||
        token.type === Token.NullLiteral;
}

function advanceSlash() {
    var prevToken,
        checkToken;
    // Using the following algorithm:
    // https://github.com/mozilla/sweet.js/wiki/design
    prevToken = extra.tokens[extra.tokens.length - 1];
    if (!prevToken) {
        // Nothing before that: it cannot be a division.
        return collectRegex();
    }
    if (prevToken.type === "Punctuator") {
        if (prevToken.value === "]") {
            return scanPunctuator();
        }
        if (prevToken.value === ")") {
            checkToken = extra.tokens[extra.openParenToken - 1];
            if (checkToken &&
                    checkToken.type === "Keyword" &&
                    (checkToken.value === "if" ||
                     checkToken.value === "while" ||
                     checkToken.value === "for" ||
                     checkToken.value === "with")) {
                return collectRegex();
            }
            return scanPunctuator();
        }
        if (prevToken.value === "}") {
            // Dividing a function by anything makes little sense,
            // but we have to check for that.
            if (extra.tokens[extra.openCurlyToken - 3] &&
                    extra.tokens[extra.openCurlyToken - 3].type === "Keyword") {
                // Anonymous function.
                checkToken = extra.tokens[extra.openCurlyToken - 4];
                if (!checkToken) {
                    return scanPunctuator();
                }
            } else if (extra.tokens[extra.openCurlyToken - 4] &&
                    extra.tokens[extra.openCurlyToken - 4].type === "Keyword") {
                // Named function.
                checkToken = extra.tokens[extra.openCurlyToken - 5];
                if (!checkToken) {
                    return collectRegex();
                }
            } else {
                return scanPunctuator();
            }
            // checkToken determines whether the function is
            // a declaration or an expression.
            if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                // It is an expression.
                return scanPunctuator();
            }
            // It is a declaration.
            return collectRegex();
        }
        return collectRegex();
    }
    if (prevToken.type === "Keyword") {
        return collectRegex();
    }
    return scanPunctuator();
}

function advance() {
    var ch,
        allowJSX = extra.ecmaFeatures.jsx,
        allowTemplateStrings = extra.ecmaFeatures.templateStrings;

    /*
     * If JSX isn't allowed or JSX is allowed and we're not inside an JSX child,
     * then skip any comments.
     */
    if (!allowJSX || !state.inJSXChild) {
        skipComment();
    }

    if (index >= length) {
        return {
            type: Token.EOF,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [index, index]
        };
    }

    // if inside an JSX child, then abort regular tokenization
    if (allowJSX && state.inJSXChild) {
        return advanceJSXChild();
    }

    ch = source.charCodeAt(index);

    // Very common: ( and ) and ;
    if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
        return scanPunctuator();
    }

    // String literal starts with single quote (U+0027) or double quote (U+0022).
    if (ch === 0x27 || ch === 0x22) {
        if (allowJSX && state.inJSXTag) {
            return scanJSXStringLiteral();
        }

        return scanStringLiteral();
    }

    if (allowJSX && state.inJSXTag && syntax.isJSXIdentifierStart(ch)) {
        return scanJSXIdentifier();
    }

    // Template strings start with backtick (U+0096) or closing curly brace (125) and backtick.
    if (allowTemplateStrings) {

        // template strings start with backtick (96) or open curly (125) but only if the open
        // curly closes a previously opened curly from a template.
        if (ch === 96 || (ch === 125 && extra.curlies[extra.curlies.length - 1] === "template")) {
            extra.curlies.pop();
            return scanTemplate();
        }
    }

    if (syntax.isIdentifierStart(ch)) {
        return scanIdentifier();
    }

    // Dot (.) U+002E can also start a floating-point number, hence the need
    // to check the next character.
    if (ch === 0x2E) {
        if (syntax.isDecimalDigit(source.charCodeAt(index + 1))) {
            return scanNumericLiteral();
        }
        return scanPunctuator();
    }

    if (syntax.isDecimalDigit(ch)) {
        return scanNumericLiteral();
    }

    // Slash (/) U+002F can also start a regex.
    if (extra.tokenize && ch === 0x2F) {
        return advanceSlash();
    }

    return scanPunctuator();
}

function collectToken() {
    var loc, token, range, value, entry,
        allowJSX = extra.ecmaFeatures.jsx;

    /* istanbul ignore else */
    if (!allowJSX || !state.inJSXChild) {
        skipComment();
    }

    loc = {
        start: {
            line: lineNumber,
            column: index - lineStart
        }
    };

    token = advance();
    loc.end = {
        line: lineNumber,
        column: index - lineStart
    };

    if (token.type !== Token.EOF) {
        range = [token.range[0], token.range[1]];
        value = source.slice(token.range[0], token.range[1]);
        entry = {
            type: TokenName[token.type],
            value: value,
            range: range,
            loc: loc
        };
        if (token.regex) {
            entry.regex = {
                pattern: token.regex.pattern,
                flags: token.regex.flags
            };
        }
        extra.tokens.push(entry);
    }

    return token;
}

function lex() {
    var token;

    token = lookahead;
    index = token.range[1];
    lineNumber = token.lineNumber;
    lineStart = token.lineStart;

    lookahead = (typeof extra.tokens !== "undefined") ? collectToken() : advance();

    index = token.range[1];
    lineNumber = token.lineNumber;
    lineStart = token.lineStart;

    if (token.type === Token.Template) {
        if (token.tail) {
            extra.curlies.pop();
        } else {
            extra.curlies.push("template");
        }
    }

    if (token.value === "{") {
        extra.curlies.push("{");
    }

    if (token.value === "}") {
        extra.curlies.pop();
    }

    return token;
}

function peek() {
    var pos,
        line,
        start;

    pos = index;
    line = lineNumber;
    start = lineStart;

    lookahead = (typeof extra.tokens !== "undefined") ? collectToken() : advance();

    index = pos;
    lineNumber = line;
    lineStart = start;
}

function lookahead2() {
    var adv, pos, line, start, result;

    // If we are collecting the tokens, don't grab the next one yet.
    /* istanbul ignore next */
    adv = (typeof extra.advance === "function") ? extra.advance : advance;

    pos = index;
    line = lineNumber;
    start = lineStart;

    // Scan for the next immediate token.
    /* istanbul ignore if */
    if (lookahead === null) {
        lookahead = adv();
    }
    index = lookahead.range[1];
    lineNumber = lookahead.lineNumber;
    lineStart = lookahead.lineStart;

    // Grab the token right after.
    result = adv();
    index = pos;
    lineNumber = line;
    lineStart = start;

    return result;
}


//------------------------------------------------------------------------------
// JSX
//------------------------------------------------------------------------------

function getQualifiedJSXName(object) {
    if (object.type === astNodeTypes.JSXIdentifier) {
        return object.name;
    }
    if (object.type === astNodeTypes.JSXNamespacedName) {
        return object.namespace.name + ":" + object.name.name;
    }
    /* istanbul ignore else */
    if (object.type === astNodeTypes.JSXMemberExpression) {
        return (
            getQualifiedJSXName(object.object) + "." +
            getQualifiedJSXName(object.property)
        );
    }
    /* istanbul ignore next */
    throwUnexpected(object);
}

function scanJSXIdentifier() {
    var ch, start, value = "";

    start = index;
    while (index < length) {
        ch = source.charCodeAt(index);
        if (!syntax.isJSXIdentifierPart(ch)) {
            break;
        }
        value += source[index++];
    }

    return {
        type: Token.JSXIdentifier,
        value: value,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

function scanJSXEntity() {
    var ch, str = "", start = index, count = 0, code;
    ch = source[index];
    assert(ch === "&", "Entity must start with an ampersand");
    index++;
    while (index < length && count++ < 10) {
        ch = source[index++];
        if (ch === ";") {
            break;
        }
        str += ch;
    }

    // Well-formed entity (ending was found).
    if (ch === ";") {
        // Numeric entity.
        if (str[0] === "#") {
            if (str[1] === "x") {
                code = +("0" + str.substr(1));
            } else {
                // Removing leading zeros in order to avoid treating as octal in old browsers.
                code = +str.substr(1).replace(Regex.LeadingZeros, "");
            }

            if (!isNaN(code)) {
                return String.fromCharCode(code);
            }
        /* istanbul ignore else */
        } else if (XHTMLEntities[str]) {
            return XHTMLEntities[str];
        }
    }

    // Treat non-entity sequences as regular text.
    index = start + 1;
    return "&";
}

function scanJSXText(stopChars) {
    var ch, str = "", start;
    start = index;
    while (index < length) {
        ch = source[index];
        if (stopChars.indexOf(ch) !== -1) {
            break;
        }
        if (ch === "&") {
            str += scanJSXEntity();
        } else {
            index++;
            if (ch === "\r" && source[index] === "\n") {
                str += ch;
                ch = source[index];
                index++;
            }
            if (syntax.isLineTerminator(ch.charCodeAt(0))) {
                ++lineNumber;
                lineStart = index;
            }
            str += ch;
        }
    }
    return {
        type: Token.JSXText,
        value: str,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
    };
}

function scanJSXStringLiteral() {
    var innerToken, quote, start;

    quote = source[index];
    assert((quote === "\"" || quote === "'"),
        "String literal must starts with a quote");

    start = index;
    ++index;

    innerToken = scanJSXText([quote]);

    if (quote !== source[index]) {
        throwError({}, Messages.UnexpectedToken, "ILLEGAL");
    }

    ++index;

    innerToken.range = [start, index];

    return innerToken;
}

/*
 * Between JSX opening and closing tags (e.g. <foo>HERE</foo>), anything that
 * is not another JSX tag and is not an expression wrapped by {} is text.
 */
function advanceJSXChild() {
    var ch = source.charCodeAt(index);

    // { (123) and < (60)
    if (ch !== 123 && ch !== 60) {
        return scanJSXText(["<", "{"]);
    }

    return scanPunctuator();
}

function parseJSXIdentifier() {
    var token, marker = markerCreate();

    if (lookahead.type !== Token.JSXIdentifier) {
        throwUnexpected(lookahead);
    }

    token = lex();
    return markerApply(marker, astNodeFactory.createJSXIdentifier(token.value));
}

function parseJSXNamespacedName() {
    var namespace, name, marker = markerCreate();

    namespace = parseJSXIdentifier();
    expect(":");
    name = parseJSXIdentifier();

    return markerApply(marker, astNodeFactory.createJSXNamespacedName(namespace, name));
}

function parseJSXMemberExpression() {
    var marker = markerCreate(),
        expr = parseJSXIdentifier();

    while (match(".")) {
        lex();
        expr = markerApply(marker, astNodeFactory.createJSXMemberExpression(expr, parseJSXIdentifier()));
    }

    return expr;
}

function parseJSXElementName() {
    if (lookahead2().value === ":") {
        return parseJSXNamespacedName();
    }
    if (lookahead2().value === ".") {
        return parseJSXMemberExpression();
    }

    return parseJSXIdentifier();
}

function parseJSXAttributeName() {
    if (lookahead2().value === ":") {
        return parseJSXNamespacedName();
    }

    return parseJSXIdentifier();
}

function parseJSXAttributeValue() {
    var value, marker;
    if (match("{")) {
        value = parseJSXExpressionContainer();
        if (value.expression.type === astNodeTypes.JSXEmptyExpression) {
            throwError(
                value,
                "JSX attributes must only be assigned a non-empty " +
                    "expression"
            );
        }
    } else if (match("<")) {
        value = parseJSXElement();
    } else if (lookahead.type === Token.JSXText) {
        marker = markerCreate();
        value = markerApply(marker, astNodeFactory.createLiteralFromSource(lex(), source));
    } else {
        throwError({}, Messages.InvalidJSXAttributeValue);
    }
    return value;
}

function parseJSXEmptyExpression() {
    var marker = markerCreatePreserveWhitespace();
    while (source.charAt(index) !== "}") {
        index++;
    }
    return markerApply(marker, astNodeFactory.createJSXEmptyExpression());
}

function parseJSXExpressionContainer() {
    var expression, origInJSXChild, origInJSXTag, marker = markerCreate();

    origInJSXChild = state.inJSXChild;
    origInJSXTag = state.inJSXTag;
    state.inJSXChild = false;
    state.inJSXTag = false;

    expect("{");

    if (match("}")) {
        expression = parseJSXEmptyExpression();
    } else {
        expression = parseExpression();
    }

    state.inJSXChild = origInJSXChild;
    state.inJSXTag = origInJSXTag;

    expect("}");

    return markerApply(marker, astNodeFactory.createJSXExpressionContainer(expression));
}

function parseJSXSpreadAttribute() {
    var expression, origInJSXChild, origInJSXTag, marker = markerCreate();

    origInJSXChild = state.inJSXChild;
    origInJSXTag = state.inJSXTag;
    state.inJSXChild = false;
    state.inJSXTag = false;
    state.inJSXSpreadAttribute = true;

    expect("{");
    expect("...");

    state.inJSXSpreadAttribute = false;

    expression = parseAssignmentExpression();

    state.inJSXChild = origInJSXChild;
    state.inJSXTag = origInJSXTag;

    expect("}");

    return markerApply(marker, astNodeFactory.createJSXSpreadAttribute(expression));
}

function parseJSXAttribute() {
    var name, marker;

    if (match("{")) {
        return parseJSXSpreadAttribute();
    }

    marker = markerCreate();

    name = parseJSXAttributeName();

    // HTML empty attribute
    if (match("=")) {
        lex();
        return markerApply(marker, astNodeFactory.createJSXAttribute(name, parseJSXAttributeValue()));
    }

    return markerApply(marker, astNodeFactory.createJSXAttribute(name));
}

function parseJSXChild() {
    var token, marker;
    if (match("{")) {
        token = parseJSXExpressionContainer();
    } else if (lookahead.type === Token.JSXText) {
        marker = markerCreatePreserveWhitespace();
        token = markerApply(marker, astNodeFactory.createLiteralFromSource(lex(), source));
    } else {
        token = parseJSXElement();
    }
    return token;
}

function parseJSXClosingElement() {
    var name, origInJSXChild, origInJSXTag, marker = markerCreate();
    origInJSXChild = state.inJSXChild;
    origInJSXTag = state.inJSXTag;
    state.inJSXChild = false;
    state.inJSXTag = true;
    expect("<");
    expect("/");
    name = parseJSXElementName();
    // Because advance() (called by lex() called by expect()) expects there
    // to be a valid token after >, it needs to know whether to look for a
    // standard JS token or an JSX text node
    state.inJSXChild = origInJSXChild;
    state.inJSXTag = origInJSXTag;
    expect(">");
    return markerApply(marker, astNodeFactory.createJSXClosingElement(name));
}

function parseJSXOpeningElement() {
    var name, attributes = [], selfClosing = false, origInJSXChild,
        origInJSXTag, marker = markerCreate();

    origInJSXChild = state.inJSXChild;
    origInJSXTag = state.inJSXTag;
    state.inJSXChild = false;
    state.inJSXTag = true;

    expect("<");

    name = parseJSXElementName();

    while (index < length &&
            lookahead.value !== "/" &&
            lookahead.value !== ">") {
        attributes.push(parseJSXAttribute());
    }

    state.inJSXTag = origInJSXTag;

    if (lookahead.value === "/") {
        expect("/");
        // Because advance() (called by lex() called by expect()) expects
        // there to be a valid token after >, it needs to know whether to
        // look for a standard JS token or an JSX text node
        state.inJSXChild = origInJSXChild;
        expect(">");
        selfClosing = true;
    } else {
        state.inJSXChild = true;
        expect(">");
    }
    return markerApply(marker, astNodeFactory.createJSXOpeningElement(name, attributes, selfClosing));
}

function parseJSXElement() {
    var openingElement, closingElement = null, children = [], origInJSXChild, origInJSXTag, marker = markerCreate();

    origInJSXChild = state.inJSXChild;
    origInJSXTag = state.inJSXTag;
    openingElement = parseJSXOpeningElement();

    if (!openingElement.selfClosing) {
        while (index < length) {
            state.inJSXChild = false; // Call lookahead2() with inJSXChild = false because </ should not be considered in the child
            if (lookahead.value === "<" && lookahead2().value === "/") {
                break;
            }
            state.inJSXChild = true;
            children.push(parseJSXChild());
        }
        state.inJSXChild = origInJSXChild;
        state.inJSXTag = origInJSXTag;
        closingElement = parseJSXClosingElement();
        if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
            throwError({}, Messages.ExpectedJSXClosingTag, getQualifiedJSXName(openingElement.name));
        }
    }

    /*
     * When (erroneously) writing two adjacent tags like
     *
     *     var x = <div>one</div><div>two</div>;
     *
     * the default error message is a bit incomprehensible. Since it"s
     * rarely (never?) useful to write a less-than sign after an JSX
     * element, we disallow it here in the parser in order to provide a
     * better error message. (In the rare case that the less-than operator
     * was intended, the left tag can be wrapped in parentheses.)
     */
    if (!origInJSXChild && match("<")) {
        throwError(lookahead, Messages.AdjacentJSXElements);
    }

    return markerApply(marker, astNodeFactory.createJSXElement(openingElement, closingElement, children));
}

//------------------------------------------------------------------------------
// Location markers
//------------------------------------------------------------------------------

/**
 * Applies location information to the given node by using the given marker.
 * The marker indicates the point at which the node is said to have to begun
 * in the source code.
 * @param {Object} marker The market to use for the node.
 * @param {ASTNode} node The AST node to apply location information to.
 * @returns {ASTNode} The node that was passed in.
 * @private
 */
function markerApply(marker, node) {

    // add range information to the node if present
    if (extra.range) {
        node.range = [marker.offset, index];
    }

    // add location information the node if present
    if (extra.loc) {
        node.loc = {
            start: {
                line: marker.line,
                column: marker.col
            },
            end: {
                line: lineNumber,
                column: index - lineStart
            }
        };
        // Attach extra.source information to the location, if present
        if (extra.source) {
            node.loc.source = extra.source;
        }
    }

    // attach leading and trailing comments if requested
    if (extra.attachComment) {
        commentAttachment.processComment(node);
    }

    return node;
}

/**
 * Creates a location marker in the source code. Location markers are used for
 * tracking where tokens and nodes appear in the source code.
 * @returns {Object} A marker object or undefined if the parser doesn't have
 *      any location information.
 * @private
 */
function markerCreate() {

    if (!extra.loc && !extra.range) {
        return undefined;
    }

    skipComment();

    return {
        offset: index,
        line: lineNumber,
        col: index - lineStart
    };
}

/**
 * Creates a location marker in the source code. Location markers are used for
 * tracking where tokens and nodes appear in the source code. This method
 * doesn't skip comments or extra whitespace which is important for JSX.
 * @returns {Object} A marker object or undefined if the parser doesn't have
 *      any location information.
 * @private
 */
function markerCreatePreserveWhitespace() {

    if (!extra.loc && !extra.range) {
        return undefined;
    }

    return {
        offset: index,
        line: lineNumber,
        col: index - lineStart
    };
}


//------------------------------------------------------------------------------
// Syntax Tree Delegate
//------------------------------------------------------------------------------

// Return true if there is a line terminator before the next token.

function peekLineTerminator() {
    var pos, line, start, found;

    pos = index;
    line = lineNumber;
    start = lineStart;
    skipComment();
    found = lineNumber !== line;
    index = pos;
    lineNumber = line;
    lineStart = start;

    return found;
}

// Throw an exception

function throwError(token, messageFormat) {

    var error,
        args = Array.prototype.slice.call(arguments, 2),
        msg = messageFormat.replace(
            /%(\d)/g,
            function (whole, index) {
                assert(index < args.length, "Message reference must be in range");
                return args[index];
            }
        );

    if (typeof token.lineNumber === "number") {
        error = new Error("Line " + token.lineNumber + ": " + msg);
        error.index = token.range[0];
        error.lineNumber = token.lineNumber;
        error.column = token.range[0] - lineStart + 1;
    } else {
        error = new Error("Line " + lineNumber + ": " + msg);
        error.index = index;
        error.lineNumber = lineNumber;
        error.column = index - lineStart + 1;
    }

    error.description = msg;
    throw error;
}

function throwErrorTolerant() {
    try {
        throwError.apply(null, arguments);
    } catch (e) {
        if (extra.errors) {
            extra.errors.push(e);
        } else {
            throw e;
        }
    }
}


// Throw an exception because of the token.

function throwUnexpected(token) {

    if (token.type === Token.EOF) {
        throwError(token, Messages.UnexpectedEOS);
    }

    if (token.type === Token.NumericLiteral) {
        throwError(token, Messages.UnexpectedNumber);
    }

    if (token.type === Token.StringLiteral || token.type === Token.JSXText) {
        throwError(token, Messages.UnexpectedString);
    }

    if (token.type === Token.Identifier) {
        throwError(token, Messages.UnexpectedIdentifier);
    }

    if (token.type === Token.Keyword) {
        if (syntax.isFutureReservedWord(token.value)) {
            throwError(token, Messages.UnexpectedReserved);
        } else if (strict && syntax.isStrictModeReservedWord(token.value)) {
            throwErrorTolerant(token, Messages.StrictReservedWord);
            return;
        }
        throwError(token, Messages.UnexpectedToken, token.value);
    }

    if (token.type === Token.Template) {
        throwError(token, Messages.UnexpectedTemplate, token.value.raw);
    }

    // BooleanLiteral, NullLiteral, or Punctuator.
    throwError(token, Messages.UnexpectedToken, token.value);
}

// Expect the next token to match the specified punctuator.
// If not, an exception will be thrown.

function expect(value) {
    var token = lex();
    if (token.type !== Token.Punctuator || token.value !== value) {
        throwUnexpected(token);
    }
}

// Expect the next token to match the specified keyword.
// If not, an exception will be thrown.

function expectKeyword(keyword) {
    var token = lex();
    if (token.type !== Token.Keyword || token.value !== keyword) {
        throwUnexpected(token);
    }
}

// Return true if the next token matches the specified punctuator.

function match(value) {
    return lookahead.type === Token.Punctuator && lookahead.value === value;
}

// Return true if the next token matches the specified keyword

function matchKeyword(keyword) {
    return lookahead.type === Token.Keyword && lookahead.value === keyword;
}

// Return true if the next token matches the specified contextual keyword
// (where an identifier is sometimes a keyword depending on the context)

function matchContextualKeyword(keyword) {
    return lookahead.type === Token.Identifier && lookahead.value === keyword;
}

// Return true if the next token is an assignment operator

function matchAssign() {
    var op;

    if (lookahead.type !== Token.Punctuator) {
        return false;
    }
    op = lookahead.value;
    return op === "=" ||
        op === "*=" ||
        op === "/=" ||
        op === "%=" ||
        op === "+=" ||
        op === "-=" ||
        op === "<<=" ||
        op === ">>=" ||
        op === ">>>=" ||
        op === "&=" ||
        op === "^=" ||
        op === "|=";
}

function consumeSemicolon() {
    var line;

    // Catch the very common case first: immediately a semicolon (U+003B).
    if (source.charCodeAt(index) === 0x3B || match(";")) {
        lex();
        return;
    }

    line = lineNumber;
    skipComment();
    if (lineNumber !== line) {
        return;
    }

    if (lookahead.type !== Token.EOF && !match("}")) {
        throwUnexpected(lookahead);
    }
}

// Return true if provided expression is LeftHandSideExpression

function isLeftHandSide(expr) {
    return expr.type === astNodeTypes.Identifier || expr.type === astNodeTypes.MemberExpression;
}

// 11.1.4 Array Initialiser

function parseArrayInitialiser() {
    var elements = [],
        marker = markerCreate(),
        tmp;

    expect("[");

    while (!match("]")) {
        if (match(",")) {
            lex(); // only get here when you have [a,,] or similar
            elements.push(null);
        } else {
            tmp = parseSpreadOrAssignmentExpression();
            elements.push(tmp);
            if (tmp && tmp.type === astNodeTypes.SpreadElement) {
                if (!match("]")) {
                    throwError({}, Messages.ElementAfterSpreadElement);
                }
            } else if (!(match("]"))) {
                expect(","); // handles the common case of comma-separated values
            }
        }
    }

    expect("]");

    return markerApply(marker, astNodeFactory.createArrayExpression(elements));
}

// 11.1.5 Object Initialiser

function parsePropertyFunction(paramInfo, options) {
    var previousStrict = strict,
        previousYieldAllowed = state.yieldAllowed,
        generator = options ? options.generator : false,
        body;

    state.yieldAllowed = generator;

    /*
     * Esprima uses parseConciseBody() here, which is incorrect. Object literal
     * methods must have braces.
     */
    body = parseFunctionSourceElements();

    if (strict && paramInfo.firstRestricted) {
        throwErrorTolerant(paramInfo.firstRestricted, Messages.StrictParamName);
    }

    if (strict && paramInfo.stricted) {
        throwErrorTolerant(paramInfo.stricted, paramInfo.message);
    }

    strict = previousStrict;
    state.yieldAllowed = previousYieldAllowed;

    return markerApply(options.marker, astNodeFactory.createFunctionExpression(
        null,
        paramInfo.params,
        paramInfo.defaults,
        body,
        paramInfo.rest,
        generator,
        body.type !== astNodeTypes.BlockStatement
    ));
}

function parsePropertyMethodFunction(options) {
    var previousStrict = strict,
        marker = markerCreate(),
        params,
        method;

    strict = true;

    params = parseParams();

    if (params.stricted) {
        throwErrorTolerant(params.stricted, params.message);
    }

    method = parsePropertyFunction(params, {
        generator: options ? options.generator : false,
        marker: marker
    });

    strict = previousStrict;

    return method;
}

function parseObjectPropertyKey() {
    var marker = markerCreate(),
        token = lex(),
        allowObjectLiteralComputed = extra.ecmaFeatures.objectLiteralComputedProperties,
        expr,
        result;

    // Note: This function is called only from parseObjectProperty(), where
    // EOF and Punctuator tokens are already filtered out.

    switch (token.type) {
        case Token.StringLiteral:
        case Token.NumericLiteral:
            if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            return markerApply(marker, astNodeFactory.createLiteralFromSource(token, source));

        case Token.Identifier:
        case Token.BooleanLiteral:
        case Token.NullLiteral:
        case Token.Keyword:
            return markerApply(marker, astNodeFactory.createIdentifier(token.value));

        case Token.Punctuator:
            if ((!state.inObjectLiteral || allowObjectLiteralComputed) &&
                    token.value === "[") {
                // For computed properties we should skip the [ and ], and
                // capture in marker only the assignment expression itself.
                marker = markerCreate();
                expr = parseAssignmentExpression();
                result = markerApply(marker, expr);
                expect("]");
                return result;
            }

        // no default
    }

    throwUnexpected(token);
}

function lookaheadPropertyName() {
    switch (lookahead.type) {
        case Token.Identifier:
        case Token.StringLiteral:
        case Token.BooleanLiteral:
        case Token.NullLiteral:
        case Token.NumericLiteral:
        case Token.Keyword:
            return true;
        case Token.Punctuator:
            return lookahead.value === "[";
        // no default
    }
    return false;
}

// This function is to try to parse a MethodDefinition as defined in 14.3. But in the case of object literals,
// it might be called at a position where there is in fact a short hand identifier pattern or a data property.
// This can only be determined after we consumed up to the left parentheses.
// In order to avoid back tracking, it returns `null` if the position is not a MethodDefinition and the caller
// is responsible to visit other options.
function tryParseMethodDefinition(token, key, computed, marker) {
    var value, options, methodMarker;

    if (token.type === Token.Identifier) {
        // check for `get` and `set`;

        if (token.value === "get" && lookaheadPropertyName()) {

            computed = match("[");
            key = parseObjectPropertyKey();
            methodMarker = markerCreate();
            expect("(");
            expect(")");

            value = parsePropertyFunction({
                params: [],
                defaults: [],
                stricted: null,
                firstRestricted: null,
                message: null,
                rest: null
            }, {
                marker: methodMarker
            });

            return markerApply(marker, astNodeFactory.createProperty("get", key, value, false, false, computed));

        } else if (token.value === "set" && lookaheadPropertyName()) {
            computed = match("[");
            key = parseObjectPropertyKey();
            methodMarker = markerCreate();
            expect("(");

            options = {
                params: [],
                defaultCount: 0,
                defaults: [],
                stricted: null,
                firstRestricted: null,
                paramSet: new StringMap(),
                rest: null
            };
            if (match(")")) {
                throwErrorTolerant(lookahead, Messages.UnexpectedToken);
            } else {
                parseParam(options);
                if (options.defaultCount === 0) {
                    options.defaults = [];
                }
            }
            expect(")");

            value = parsePropertyFunction(options, { marker: methodMarker });
            return markerApply(marker, astNodeFactory.createProperty("set", key, value, false, false, computed));
        }
    }

    if (match("(")) {
        value = parsePropertyMethodFunction();
        return markerApply(marker, astNodeFactory.createProperty("init", key, value, true, false, computed));
    }

    // Not a MethodDefinition.
    return null;
}

// TODO(nzakas): Update to match Esprima
function parseObjectProperty() {
    var token, key, id, computed, methodMarker, options;
    var allowComputed = extra.ecmaFeatures.objectLiteralComputedProperties,
        allowMethod = extra.ecmaFeatures.objectLiteralShorthandMethods,
        allowShorthand = extra.ecmaFeatures.objectLiteralShorthandProperties,
        allowGenerators = extra.ecmaFeatures.generators,
        allowDestructuring = extra.ecmaFeatures.destructuring,
        marker = markerCreate();

    token = lookahead;
    computed = (token.value === "[" && token.type === Token.Punctuator);

    if (token.type === Token.Identifier || (allowComputed && computed)) {

        id = parseObjectPropertyKey();

        /*
         * Check for getters and setters. Be careful! "get" and "set" are legal
         * method names. It's only a getter or setter if followed by a space.
         */
        if (token.value === "get" && !(match(":") || match("("))) {
            computed = (lookahead.value === "[");
            key = parseObjectPropertyKey();
            methodMarker = markerCreate();
            expect("(");
            expect(")");

            return markerApply(
                marker,
                astNodeFactory.createProperty(
                    "get",
                    key,
                    parsePropertyFunction({
                        generator: false
                    }, {
                        marker: methodMarker
                    }),
                    false,
                    false,
                    computed
                )
            );
        }

        if (token.value === "set" && !(match(":") || match("("))) {
            computed = (lookahead.value === "[");
            key = parseObjectPropertyKey();
            methodMarker = markerCreate();
            expect("(");

            options = {
                params: [],
                defaultCount: 0,
                defaults: [],
                stricted: null,
                firstRestricted: null,
                paramSet: new StringMap(),
                rest: null
            };

            if (match(")")) {
                throwErrorTolerant(lookahead, Messages.UnexpectedToken, lookahead.value);
            } else {
                parseParam(options);
                if (options.defaultCount === 0) {
                    options.defaults = [];
                }
            }

            expect(")");

            return markerApply(
                marker,
                astNodeFactory.createProperty(
                    "set",
                    key,
                    parsePropertyFunction(options, {
                        marker: methodMarker
                    }),
                    false,
                    false,
                    computed
                )
            );
        }

        // normal property (key:value)
        if (match(":")) {
            lex();
            return markerApply(
                marker,
                astNodeFactory.createProperty(
                    "init",
                    id,
                    parseAssignmentExpression(),
                    false,
                    false,
                    computed
                )
            );
        }

        // method shorthand (key(){...})
        if (allowMethod && match("(")) {
            return markerApply(
                marker,
                astNodeFactory.createProperty(
                    "init",
                    id,
                    parsePropertyMethodFunction({ generator: false }),
                    true,
                    false,
                    computed
                )
            );
        }

        // destructuring defaults (shorthand syntax)
        if (allowDestructuring && match("=")) {
            lex();
            var value = parseAssignmentExpression();
            var prop = markerApply(marker, astNodeFactory.createAssignmentExpression("=", id, value));
            prop.type = astNodeTypes.AssignmentPattern;
            var fullProperty = astNodeFactory.createProperty(
                "init",
                id,
                prop,
                false,
                true, // shorthand
                computed
            );
            return markerApply(marker, fullProperty);
        }

        /*
         * Only other possibility is that this is a shorthand property. Computed
         * properties cannot use shorthand notation, so that's a syntax error.
         * If shorthand properties aren't allow, then this is an automatic
         * syntax error. Destructuring is another case with a similar shorthand syntax.
         */
        if (computed || (!allowShorthand && !allowDestructuring)) {
            throwUnexpected(lookahead);
        }

        // shorthand property
        return markerApply(
            marker,
            astNodeFactory.createProperty(
                "init",
                id,
                id,
                false,
                true,
                false
            )
        );
    }

    // only possibility in this branch is a generator
    if (token.type === Token.EOF || token.type === Token.Punctuator) {
        if (!allowGenerators || !match("*")) {
            throwUnexpected(token);
        }
        lex();

        computed = (lookahead.type === Token.Punctuator && lookahead.value === "[");

        id = parseObjectPropertyKey();

        if (!match("(")) {
            throwUnexpected(lex());
        }

        return markerApply(
            marker,
            astNodeFactory.createProperty(
                "init",
                id,
                parsePropertyMethodFunction({ generator: true }),
                true,
                false,
                computed
            )
        );

    }

    /*
     * If we've made it here, then that means the property name is represented
     * by a string (i.e, { "foo": 2}). The only options here are normal
     * property with a colon or a method.
     */
    key = parseObjectPropertyKey();

    // check for property value
    if (match(":")) {
        lex();
        return markerApply(
            marker,
            astNodeFactory.createProperty(
                "init",
                key,
                parseAssignmentExpression(),
                false,
                false,
                false
            )
        );
    }

    // check for method
    if (allowMethod && match("(")) {
        return markerApply(
            marker,
            astNodeFactory.createProperty(
                "init",
                key,
                parsePropertyMethodFunction(),
                true,
                false,
                false
            )
        );
    }

    // no other options, this is bad
    throwUnexpected(lex());
}

function getFieldName(key) {
    var toString = String;
    if (key.type === astNodeTypes.Identifier) {
        return key.name;
    }
    return toString(key.value);
}

function parseObjectInitialiser() {
    var marker = markerCreate(),
        allowDuplicates = extra.ecmaFeatures.objectLiteralDuplicateProperties,
        properties = [],
        property,
        name,
        propertyFn,
        kind,
        storedKind,
        kindMap = new StringMap();

    state.inObjectLiteral = true;

    expect("{");

    while (!match("}")) {

        property = parseObjectProperty();

        if (!property.computed) {

            name = getFieldName(property.key);
            propertyFn = (property.kind === "get") ? PropertyKind.Get : PropertyKind.Set;
            kind = (property.kind === "init") ? PropertyKind.Data : propertyFn;

            if (kindMap.has(name)) {
                storedKind = kindMap.get(name);
                if (storedKind === PropertyKind.Data) {
                    if (kind === PropertyKind.Data && name === "__proto__" && allowDuplicates) {
                        // Duplicate '__proto__' literal properties are forbidden in ES 6
                        throwErrorTolerant({}, Messages.DuplicatePrototypeProperty);
                    } else if (strict && kind === PropertyKind.Data && !allowDuplicates) {
                        // Duplicate literal properties are only forbidden in ES 5 strict mode
                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                    } else if (kind !== PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    }
                } else {
                    if (kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    } else if (storedKind & kind) {
                        throwErrorTolerant({}, Messages.AccessorGetSet);
                    }
                }
                kindMap.set(name, storedKind | kind);
            } else {
                kindMap.set(name, kind);
            }
        }

        properties.push(property);

        if (!match("}")) {
            expect(",");
        }
    }

    expect("}");

    state.inObjectLiteral = false;

    return markerApply(marker, astNodeFactory.createObjectExpression(properties));
}

/**
 * Parse a template string element and return its ASTNode representation
 * @param {Object} options Parsing & scanning options
 * @param {Object} options.head True if this element is the first in the
 *                               template string, false otherwise.
 * @returns {ASTNode} The template element node with marker info applied
 * @private
 */
function parseTemplateElement(options) {
    var marker = markerCreate(),
        token = scanTemplateElement(options);
    if (strict && token.octal) {
        throwError(token, Messages.StrictOctalLiteral);
    }
    return markerApply(marker, astNodeFactory.createTemplateElement({ raw: token.value.raw, cooked: token.value.cooked }, token.tail));
}

/**
 * Parse a template string literal and return its ASTNode representation
 * @returns {ASTNode} The template literal node with marker info applied
 * @private
 */
function parseTemplateLiteral() {
    var quasi, quasis, expressions, marker = markerCreate();

    quasi = parseTemplateElement({ head: true });
    quasis = [ quasi ];
    expressions = [];

    while (!quasi.tail) {
        expressions.push(parseExpression());
        quasi = parseTemplateElement({ head: false });
        quasis.push(quasi);
    }

    return markerApply(marker, astNodeFactory.createTemplateLiteral(quasis, expressions));
}

// 11.1.6 The Grouping Operator

function parseGroupExpression() {
    var expr;

    expect("(");

    ++state.parenthesisCount;

    expr = parseExpression();

    expect(")");

    return expr;
}


// 11.1 Primary Expressions

function parsePrimaryExpression() {
    var type, token, expr,
        marker,
        allowJSX = extra.ecmaFeatures.jsx,
        allowSuper = extra.ecmaFeatures.superInFunctions,
        allowClasses = extra.ecmaFeatures.classes;

    if (match("(")) {
        return parseGroupExpression();
    }

    if (match("[")) {
        return parseArrayInitialiser();
    }

    if (match("{")) {
        return parseObjectInitialiser();
    }

    if (allowJSX && match("<")) {
        return parseJSXElement();
    }

    type = lookahead.type;
    marker = markerCreate();

    if (type === Token.Identifier) {
        expr = astNodeFactory.createIdentifier(lex().value);
    } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
        if (strict && lookahead.octal) {
            throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
        }
        expr = astNodeFactory.createLiteralFromSource(lex(), source);
    } else if (type === Token.Keyword) {
        if (matchKeyword("function")) {
            return parseFunctionExpression();
        }

        if (allowSuper && matchKeyword("super") && state.inFunctionBody) {
            marker = markerCreate();
            lex();
            return markerApply(marker, astNodeFactory.createIdentifier("super"));
        }

        if (matchKeyword("this")) {
            marker = markerCreate();
            lex();
            return markerApply(marker, astNodeFactory.createThisExpression());
        }

        if (allowClasses && matchKeyword("class")) {
            return parseClassExpression();
        }

        throwUnexpected(lex());
    } else if (type === Token.BooleanLiteral) {
        token = lex();
        token.value = (token.value === "true");
        expr = astNodeFactory.createLiteralFromSource(token, source);
    } else if (type === Token.NullLiteral) {
        token = lex();
        token.value = null;
        expr = astNodeFactory.createLiteralFromSource(token, source);
    } else if (match("/") || match("/=")) {
        if (typeof extra.tokens !== "undefined") {
            expr = astNodeFactory.createLiteralFromSource(collectRegex(), source);
        } else {
            expr = astNodeFactory.createLiteralFromSource(scanRegExp(), source);
        }
        peek();
    } else if (type === Token.Template) {
        return parseTemplateLiteral();
    } else {
       throwUnexpected(lex());
    }

    return markerApply(marker, expr);
}

// 11.2 Left-Hand-Side Expressions

function parseArguments() {
    var args = [], arg;

    expect("(");

    if (!match(")")) {
        while (index < length) {
            arg = parseSpreadOrAssignmentExpression();
            args.push(arg);

            if (match(")")) {
                break;
            } else if (arg.type === astNodeTypes.SpreadElement) {
                throwError({}, Messages.ElementAfterSpreadElement);
            }

            expect(",");
        }
    }

    expect(")");

    return args;
}

function parseSpreadOrAssignmentExpression() {
    if (match("...")) {
        var marker = markerCreate();
        lex();
        return markerApply(marker, astNodeFactory.createSpreadElement(parseAssignmentExpression()));
    }
    return parseAssignmentExpression();
}

function parseNonComputedProperty() {
    var token,
        marker = markerCreate();

    token = lex();

    if (!isIdentifierName(token)) {
        throwUnexpected(token);
    }

    return markerApply(marker, astNodeFactory.createIdentifier(token.value));
}

function parseNonComputedMember() {
    expect(".");

    return parseNonComputedProperty();
}

function parseComputedMember() {
    var expr;

    expect("[");

    expr = parseExpression();

    expect("]");

    return expr;
}

function parseNewExpression() {
    var callee, args,
        marker = markerCreate();

    expectKeyword("new");
    callee = parseLeftHandSideExpression();
    args = match("(") ? parseArguments() : [];

    return markerApply(marker, astNodeFactory.createNewExpression(callee, args));
}

function parseLeftHandSideExpressionAllowCall() {
    var expr, args,
        previousAllowIn = state.allowIn,
        marker = markerCreate();

    state.allowIn = true;
    expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression();
    state.allowIn = previousAllowIn;

    // only start parsing template literal if the lookahead is a head (beginning with `)
    while (match(".") || match("[") || match("(") || (lookahead.type === Token.Template && lookahead.head)) {
        if (match("(")) {
            args = parseArguments();
            expr = markerApply(marker, astNodeFactory.createCallExpression(expr, args));
        } else if (match("[")) {
            expr = markerApply(marker, astNodeFactory.createMemberExpression("[", expr, parseComputedMember()));
        } else if (match(".")) {
            expr = markerApply(marker, astNodeFactory.createMemberExpression(".", expr, parseNonComputedMember()));
        } else if (!lookahead.tail) {
            expr = markerApply(marker, astNodeFactory.createTaggedTemplateExpression(expr, parseTemplateLiteral()));
        }
    }

    return expr;
}

function parseLeftHandSideExpression() {
    var expr,
        previousAllowIn = state.allowIn,
        marker = markerCreate();

    expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression();
    state.allowIn = previousAllowIn;

    // only start parsing template literal if the lookahead is a head (beginning with `)
    while (match(".") || match("[") || (lookahead.type === Token.Template && lookahead.head)) {
        if (match("[")) {
            expr = markerApply(marker, astNodeFactory.createMemberExpression("[", expr, parseComputedMember()));
        } else if (match(".")) {
            expr = markerApply(marker, astNodeFactory.createMemberExpression(".", expr, parseNonComputedMember()));
        } else {
            expr = markerApply(marker, astNodeFactory.createTaggedTemplateExpression(expr, parseTemplateLiteral()));
        }
    }

    return expr;
}


// 11.3 Postfix Expressions

function parsePostfixExpression() {
    var expr, token,
        marker = markerCreate();

    expr = parseLeftHandSideExpressionAllowCall();

    if (lookahead.type === Token.Punctuator) {
        if ((match("++") || match("--")) && !peekLineTerminator()) {
            // 11.3.1, 11.3.2
            if (strict && expr.type === astNodeTypes.Identifier && syntax.isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPostfix);
            }

            if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            token = lex();
            expr = markerApply(marker, astNodeFactory.createPostfixExpression(token.value, expr));
        }
    }

    return expr;
}

// 11.4 Unary Operators

function parseUnaryExpression() {
    var token, expr,
        marker;

    if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
        expr = parsePostfixExpression();
    } else if (match("++") || match("--")) {
        marker = markerCreate();
        token = lex();
        expr = parseUnaryExpression();
        // 11.4.4, 11.4.5
        if (strict && expr.type === astNodeTypes.Identifier && syntax.isRestrictedWord(expr.name)) {
            throwErrorTolerant({}, Messages.StrictLHSPrefix);
        }

        if (!isLeftHandSide(expr)) {
            throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }

        expr = astNodeFactory.createUnaryExpression(token.value, expr);
        expr = markerApply(marker, expr);
    } else if (match("+") || match("-") || match("~") || match("!")) {
        marker = markerCreate();
        token = lex();
        expr = parseUnaryExpression();
        expr = astNodeFactory.createUnaryExpression(token.value, expr);
        expr = markerApply(marker, expr);
    } else if (matchKeyword("delete") || matchKeyword("void") || matchKeyword("typeof")) {
        marker = markerCreate();
        token = lex();
        expr = parseUnaryExpression();
        expr = astNodeFactory.createUnaryExpression(token.value, expr);
        expr = markerApply(marker, expr);
        if (strict && expr.operator === "delete" && expr.argument.type === astNodeTypes.Identifier) {
            throwErrorTolerant({}, Messages.StrictDelete);
        }
    } else {
        expr = parsePostfixExpression();
    }

    return expr;
}

function binaryPrecedence(token, allowIn) {
    var prec = 0;

    if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
        return 0;
    }

    switch (token.value) {
    case "||":
        prec = 1;
        break;

    case "&&":
        prec = 2;
        break;

    case "|":
        prec = 3;
        break;

    case "^":
        prec = 4;
        break;

    case "&":
        prec = 5;
        break;

    case "==":
    case "!=":
    case "===":
    case "!==":
        prec = 6;
        break;

    case "<":
    case ">":
    case "<=":
    case ">=":
    case "instanceof":
        prec = 7;
        break;

    case "in":
        prec = allowIn ? 7 : 0;
        break;

    case "<<":
    case ">>":
    case ">>>":
        prec = 8;
        break;

    case "+":
    case "-":
        prec = 9;
        break;

    case "*":
    case "/":
    case "%":
        prec = 11;
        break;

    default:
        break;
    }

    return prec;
}

// 11.5 Multiplicative Operators
// 11.6 Additive Operators
// 11.7 Bitwise Shift Operators
// 11.8 Relational Operators
// 11.9 Equality Operators
// 11.10 Binary Bitwise Operators
// 11.11 Binary Logical Operators
function parseBinaryExpression() {
    var expr, token, prec, previousAllowIn, stack, right, operator, left, i,
        marker, markers;

    previousAllowIn = state.allowIn;
    state.allowIn = true;

    marker = markerCreate();
    left = parseUnaryExpression();

    token = lookahead;
    prec = binaryPrecedence(token, previousAllowIn);
    if (prec === 0) {
        return left;
    }
    token.prec = prec;
    lex();

    markers = [marker, markerCreate()];
    right = parseUnaryExpression();

    stack = [left, token, right];

    while ((prec = binaryPrecedence(lookahead, previousAllowIn)) > 0) {

        // Reduce: make a binary expression from the three topmost entries.
        while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
            right = stack.pop();
            operator = stack.pop().value;
            left = stack.pop();
            expr = astNodeFactory.createBinaryExpression(operator, left, right);
            markers.pop();
            marker = markers.pop();
            markerApply(marker, expr);
            stack.push(expr);
            markers.push(marker);
        }

        // Shift.
        token = lex();
        token.prec = prec;
        stack.push(token);
        markers.push(markerCreate());
        expr = parseUnaryExpression();
        stack.push(expr);
    }

    state.allowIn = previousAllowIn;

    // Final reduce to clean-up the stack.
    i = stack.length - 1;
    expr = stack[i];
    markers.pop();
    while (i > 1) {
        expr = astNodeFactory.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
        i -= 2;
        marker = markers.pop();
        markerApply(marker, expr);
    }

    return expr;
}

// 11.12 Conditional Operator

function parseConditionalExpression() {
    var expr, previousAllowIn, consequent, alternate,
        marker = markerCreate();

    expr = parseBinaryExpression();

    if (match("?")) {
        lex();
        previousAllowIn = state.allowIn;
        state.allowIn = true;
        consequent = parseAssignmentExpression();
        state.allowIn = previousAllowIn;
        expect(":");
        alternate = parseAssignmentExpression();

        expr = astNodeFactory.createConditionalExpression(expr, consequent, alternate);
        markerApply(marker, expr);
    }

    return expr;
}

// [ES6] 14.2 Arrow Function

function parseConciseBody() {
    if (match("{")) {
        return parseFunctionSourceElements();
    }
    return parseAssignmentExpression();
}

function reinterpretAsCoverFormalsList(expressions) {
    var i, len, param, params, defaults, defaultCount, options, rest;

    params = [];
    defaults = [];
    defaultCount = 0;
    rest = null;
    options = {
        paramSet: new StringMap()
    };

    for (i = 0, len = expressions.length; i < len; i += 1) {
        param = expressions[i];
        if (param.type === astNodeTypes.Identifier) {
            params.push(param);
            defaults.push(null);
            validateParam(options, param, param.name);
        }  else if (param.type === astNodeTypes.ObjectExpression || param.type === astNodeTypes.ArrayExpression) {
            reinterpretAsDestructuredParameter(options, param);
            params.push(param);
            defaults.push(null);
        } else if (param.type === astNodeTypes.SpreadElement) {
            assert(i === len - 1, "It is guaranteed that SpreadElement is last element by parseExpression");
            if (param.argument.type !== astNodeTypes.Identifier) {
                throwError({}, Messages.InvalidLHSInFormalsList);
            }
            reinterpretAsDestructuredParameter(options, param.argument);
            rest = param.argument;
        } else if (param.type === astNodeTypes.AssignmentExpression) {
            params.push(param.left);
            defaults.push(param.right);
            ++defaultCount;
            validateParam(options, param.left, param.left.name);
        } else {
            return null;
        }
    }

    if (options.message === Messages.StrictParamDupe) {
        throwError(
            strict ? options.stricted : options.firstRestricted,
            options.message
        );
    }

    // must be here so it's not an array of [null, null]
    if (defaultCount === 0) {
        defaults = [];
    }

    return {
        params: params,
        defaults: defaults,
        rest: rest,
        stricted: options.stricted,
        firstRestricted: options.firstRestricted,
        message: options.message
    };
}

function parseArrowFunctionExpression(options, marker) {
    var previousStrict, body;

    expect("=>");
    previousStrict = strict;

    body = parseConciseBody();

    if (strict && options.firstRestricted) {
        throwError(options.firstRestricted, options.message);
    }
    if (strict && options.stricted) {
        throwErrorTolerant(options.stricted, options.message);
    }

    strict = previousStrict;
    return markerApply(marker, astNodeFactory.createArrowFunctionExpression(
        options.params,
        options.defaults,
        body,
        options.rest,
        body.type !== astNodeTypes.BlockStatement
    ));
}

// 11.13 Assignment Operators

// 12.14.5 AssignmentPattern

function reinterpretAsAssignmentBindingPattern(expr) {
    var i, len, property, element,
        allowDestructuring = extra.ecmaFeatures.destructuring;

    if (!allowDestructuring) {
        throwUnexpected(lex());
    }

    if (expr.type === astNodeTypes.ObjectExpression) {
        expr.type = astNodeTypes.ObjectPattern;
        for (i = 0, len = expr.properties.length; i < len; i += 1) {
            property = expr.properties[i];
            if (property.kind !== "init") {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }
            reinterpretAsAssignmentBindingPattern(property.value);
        }
    } else if (expr.type === astNodeTypes.ArrayExpression) {
        expr.type = astNodeTypes.ArrayPattern;
        for (i = 0, len = expr.elements.length; i < len; i += 1) {
            element = expr.elements[i];
            /* istanbul ignore else */
            if (element) {
                reinterpretAsAssignmentBindingPattern(element);
            }
        }
    } else if (expr.type === astNodeTypes.Identifier) {
        if (syntax.isRestrictedWord(expr.name)) {
            throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }
    } else if (expr.type === astNodeTypes.SpreadElement) {
        reinterpretAsAssignmentBindingPattern(expr.argument);
        if (expr.argument.type === astNodeTypes.ObjectPattern) {
            throwErrorTolerant({}, Messages.ObjectPatternAsSpread);
        }
    } else if (expr.type === "AssignmentExpression" && expr.operator === "=") {
        expr.type = astNodeTypes.AssignmentPattern;
    } else {
        /* istanbul ignore else */
        if (expr.type !== astNodeTypes.MemberExpression &&
            expr.type !== astNodeTypes.CallExpression &&
            expr.type !== astNodeTypes.NewExpression &&
            expr.type !== astNodeTypes.AssignmentPattern
        ) {
            throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }
    }
}

// 13.2.3 BindingPattern

function reinterpretAsDestructuredParameter(options, expr) {
    var i, len, property, element,
        allowDestructuring = extra.ecmaFeatures.destructuring;

    if (!allowDestructuring) {
        throwUnexpected(lex());
    }

    if (expr.type === astNodeTypes.ObjectExpression) {
        expr.type = astNodeTypes.ObjectPattern;
        for (i = 0, len = expr.properties.length; i < len; i += 1) {
            property = expr.properties[i];
            if (property.kind !== "init") {
                throwErrorTolerant({}, Messages.InvalidLHSInFormalsList);
            }
            reinterpretAsDestructuredParameter(options, property.value);
        }
    } else if (expr.type === astNodeTypes.ArrayExpression) {
        expr.type = astNodeTypes.ArrayPattern;
        for (i = 0, len = expr.elements.length; i < len; i += 1) {
            element = expr.elements[i];
            if (element) {
                reinterpretAsDestructuredParameter(options, element);
            }
        }
    } else if (expr.type === astNodeTypes.Identifier) {
        validateParam(options, expr, expr.name);
    } else if (expr.type === astNodeTypes.SpreadElement) {
        // BindingRestElement only allows BindingIdentifier
        if (expr.argument.type !== astNodeTypes.Identifier) {
            throwErrorTolerant({}, Messages.InvalidLHSInFormalsList);
        }
        validateParam(options, expr.argument, expr.argument.name);
    } else if (expr.type === astNodeTypes.AssignmentExpression && expr.operator === "=") {
        expr.type = astNodeTypes.AssignmentPattern;
    } else if (expr.type !== astNodeTypes.AssignmentPattern) {
        throwError({}, Messages.InvalidLHSInFormalsList);
    }
}

function parseAssignmentExpression() {
    var token, left, right, node, params,
        marker,
        startsWithParen = false,
        oldParenthesisCount = state.parenthesisCount,
        allowGenerators = extra.ecmaFeatures.generators;

    // Note that 'yield' is treated as a keyword in strict mode, but a
    // contextual keyword (identifier) in non-strict mode, so we need
    // to use matchKeyword and matchContextualKeyword appropriately.
    if (allowGenerators && ((state.yieldAllowed && matchContextualKeyword("yield")) || (strict && matchKeyword("yield")))) {
        return parseYieldExpression();
    }

    marker = markerCreate();

    if (match("(")) {
        token = lookahead2();
        if ((token.value === ")" && token.type === Token.Punctuator) || token.value === "...") {
            params = parseParams();
            if (!match("=>")) {
                throwUnexpected(lex());
            }
            return parseArrowFunctionExpression(params, marker);
        }
        startsWithParen = true;
    }

    // revert to the previous lookahead style object
    token = lookahead;
    node = left = parseConditionalExpression();

    if (match("=>") &&
            (state.parenthesisCount === oldParenthesisCount ||
            state.parenthesisCount === (oldParenthesisCount + 1))) {

        if (node.type === astNodeTypes.Identifier) {
            params = reinterpretAsCoverFormalsList([ node ]);
        } else if (node.type === astNodeTypes.AssignmentExpression ||
            node.type === astNodeTypes.ArrayExpression ||
            node.type === astNodeTypes.ObjectExpression) {
            if (!startsWithParen) {
                throwUnexpected(lex());
            }
            params = reinterpretAsCoverFormalsList([ node ]);
        } else if (node.type === astNodeTypes.SequenceExpression) {
            params = reinterpretAsCoverFormalsList(node.expressions);
        }

        if (params) {
            return parseArrowFunctionExpression(params, marker);
        }
    }

    if (matchAssign()) {

        // 11.13.1
        if (strict && left.type === astNodeTypes.Identifier && syntax.isRestrictedWord(left.name)) {
            throwErrorTolerant(token, Messages.StrictLHSAssignment);
        }

        // ES.next draf 11.13 Runtime Semantics step 1
        if (match("=") && (node.type === astNodeTypes.ObjectExpression || node.type === astNodeTypes.ArrayExpression)) {
            reinterpretAsAssignmentBindingPattern(node);
        } else if (!isLeftHandSide(node)) {
            throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }

        token = lex();
        right = parseAssignmentExpression();
        node = markerApply(marker, astNodeFactory.createAssignmentExpression(token.value, left, right));
    }

    return node;
}

// 11.14 Comma Operator

function parseExpression() {
    var marker = markerCreate(),
        expr = parseAssignmentExpression(),
        expressions = [ expr ],
        sequence, spreadFound;

    if (match(",")) {
        while (index < length) {
            if (!match(",")) {
                break;
            }
            lex();
            expr = parseSpreadOrAssignmentExpression();
            expressions.push(expr);

            if (expr.type === astNodeTypes.SpreadElement) {
                spreadFound = true;
                if (!match(")")) {
                    throwError({}, Messages.ElementAfterSpreadElement);
                }
                break;
            }
        }

        sequence = markerApply(marker, astNodeFactory.createSequenceExpression(expressions));
    }

    if (spreadFound && lookahead2().value !== "=>") {
        throwError({}, Messages.IllegalSpread);
    }

    return sequence || expr;
}

// 12.1 Block

function parseStatementList() {
    var list = [],
        statement;

    while (index < length) {
        if (match("}")) {
            break;
        }
        statement = parseSourceElement();
        if (typeof statement === "undefined") {
            break;
        }
        list.push(statement);
    }

    return list;
}

function parseBlock() {
    var block,
        marker = markerCreate();

    expect("{");

    block = parseStatementList();

    expect("}");

    return markerApply(marker, astNodeFactory.createBlockStatement(block));
}

// 12.2 Variable Statement

function parseVariableIdentifier() {
    var token,
        marker = markerCreate();

    token = lex();

    if (token.type !== Token.Identifier) {
        if (strict && token.type === Token.Keyword && syntax.isStrictModeReservedWord(token.value)) {
            throwErrorTolerant(token, Messages.StrictReservedWord);
        } else {
            throwUnexpected(token);
        }
    }

    return markerApply(marker, astNodeFactory.createIdentifier(token.value));
}

function parseVariableDeclaration(kind) {
    var id,
        marker = markerCreate(),
        init = null;
    if (match("{")) {
        id = parseObjectInitialiser();
        reinterpretAsAssignmentBindingPattern(id);
    } else if (match("[")) {
        id = parseArrayInitialiser();
        reinterpretAsAssignmentBindingPattern(id);
    } else {
        /* istanbul ignore next */
        id = state.allowKeyword ? parseNonComputedProperty() : parseVariableIdentifier();
        // 12.2.1
        if (strict && syntax.isRestrictedWord(id.name)) {
            throwErrorTolerant({}, Messages.StrictVarName);
        }
    }

    // TODO: Verify against feature flags
    if (kind === "const") {
        if (!match("=")) {
            throwError({}, Messages.NoUnintializedConst);
        }
        expect("=");
        init = parseAssignmentExpression();
    } else if (match("=")) {
        lex();
        init = parseAssignmentExpression();
    }

    return markerApply(marker, astNodeFactory.createVariableDeclarator(id, init));
}

function parseVariableDeclarationList(kind) {
    var list = [];

    do {
        list.push(parseVariableDeclaration(kind));
        if (!match(",")) {
            break;
        }
        lex();
    } while (index < length);

    return list;
}

function parseVariableStatement() {
    var declarations;

    expectKeyword("var");

    declarations = parseVariableDeclarationList();

    consumeSemicolon();

    return astNodeFactory.createVariableDeclaration(declarations, "var");
}

// kind may be `const` or `let`
// Both are experimental and not in the specification yet.
// see http://wiki.ecmascript.org/doku.php?id=harmony:const
// and http://wiki.ecmascript.org/doku.php?id=harmony:let
function parseConstLetDeclaration(kind) {
    var declarations,
        marker = markerCreate();

    expectKeyword(kind);

    declarations = parseVariableDeclarationList(kind);

    consumeSemicolon();

    return markerApply(marker, astNodeFactory.createVariableDeclaration(declarations, kind));
}

// 12.3 Empty Statement

function parseEmptyStatement() {
    expect(";");
    return astNodeFactory.createEmptyStatement();
}

// 12.4 Expression Statement

function parseExpressionStatement() {
    var expr = parseExpression();
    consumeSemicolon();
    return astNodeFactory.createExpressionStatement(expr);
}

// 12.5 If statement

function parseIfStatement() {
    var test, consequent, alternate;

    expectKeyword("if");

    expect("(");

    test = parseExpression();

    expect(")");

    consequent = parseStatement();

    if (matchKeyword("else")) {
        lex();
        alternate = parseStatement();
    } else {
        alternate = null;
    }

    return astNodeFactory.createIfStatement(test, consequent, alternate);
}

// 12.6 Iteration Statements

function parseDoWhileStatement() {
    var body, test, oldInIteration;

    expectKeyword("do");

    oldInIteration = state.inIteration;
    state.inIteration = true;

    body = parseStatement();

    state.inIteration = oldInIteration;

    expectKeyword("while");

    expect("(");

    test = parseExpression();

    expect(")");

    if (match(";")) {
        lex();
    }

    return astNodeFactory.createDoWhileStatement(test, body);
}

function parseWhileStatement() {
    var test, body, oldInIteration;

    expectKeyword("while");

    expect("(");

    test = parseExpression();

    expect(")");

    oldInIteration = state.inIteration;
    state.inIteration = true;

    body = parseStatement();

    state.inIteration = oldInIteration;

    return astNodeFactory.createWhileStatement(test, body);
}

function parseForVariableDeclaration() {
    var token, declarations,
        marker = markerCreate();

    token = lex();
    declarations = parseVariableDeclarationList();

    return markerApply(marker, astNodeFactory.createVariableDeclaration(declarations, token.value));
}

function parseForStatement(opts) {
    var init, test, update, left, right, body, operator, oldInIteration;
    var allowForOf = extra.ecmaFeatures.forOf,
        allowBlockBindings = extra.ecmaFeatures.blockBindings;

    init = test = update = null;

    expectKeyword("for");

    expect("(");

    if (match(";")) {
        lex();
    } else {

        if (matchKeyword("var") ||
            (allowBlockBindings && (matchKeyword("let") || matchKeyword("const")))
        ) {
            state.allowIn = false;
            init = parseForVariableDeclaration();
            state.allowIn = true;

            if (init.declarations.length === 1) {
                if (matchKeyword("in") || (allowForOf && matchContextualKeyword("of"))) {
                    operator = lookahead;

                    // TODO: is "var" check here really needed? wasn"t in 1.2.2
                    if (!((operator.value === "in" || init.kind !== "var") && init.declarations[0].init)) {
                        lex();
                        left = init;
                        right = parseExpression();
                        init = null;
                    }
                }
            }

        } else {
            state.allowIn = false;
            init = parseExpression();
            state.allowIn = true;

            if (allowForOf && matchContextualKeyword("of")) {
                operator = lex();
                left = init;
                right = parseExpression();
                init = null;
            } else if (matchKeyword("in")) {
                // LeftHandSideExpression
                if (!isLeftHandSide(init)) {
                    throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                }

                operator = lex();
                left = init;
                right = parseExpression();
                init = null;
            }
        }

        if (typeof left === "undefined") {
            expect(";");
        }
    }

    if (typeof left === "undefined") {

        if (!match(";")) {
            test = parseExpression();
        }
        expect(";");

        if (!match(")")) {
            update = parseExpression();
        }
    }

    expect(")");

    oldInIteration = state.inIteration;
    state.inIteration = true;

    if (!(opts !== undefined && opts.ignoreBody)) {
        body = parseStatement();
    }

    state.inIteration = oldInIteration;

    if (typeof left === "undefined") {
        return astNodeFactory.createForStatement(init, test, update, body);
    }

    if (extra.ecmaFeatures.forOf && operator.value === "of") {
        return astNodeFactory.createForOfStatement(left, right, body);
    }

    return astNodeFactory.createForInStatement(left, right, body);
}

// 12.7 The continue statement

function parseContinueStatement() {
    var label = null;

    expectKeyword("continue");

    // Optimize the most common form: "continue;".
    if (source.charCodeAt(index) === 0x3B) {
        lex();

        if (!state.inIteration) {
            throwError({}, Messages.IllegalContinue);
        }

        return astNodeFactory.createContinueStatement(null);
    }

    if (peekLineTerminator()) {
        if (!state.inIteration) {
            throwError({}, Messages.IllegalContinue);
        }

        return astNodeFactory.createContinueStatement(null);
    }

    if (lookahead.type === Token.Identifier) {
        label = parseVariableIdentifier();

        if (!state.labelSet.has(label.name)) {
            throwError({}, Messages.UnknownLabel, label.name);
        }
    }

    consumeSemicolon();

    if (label === null && !state.inIteration) {
        throwError({}, Messages.IllegalContinue);
    }

    return astNodeFactory.createContinueStatement(label);
}

// 12.8 The break statement

function parseBreakStatement() {
    var label = null;

    expectKeyword("break");

    // Catch the very common case first: immediately a semicolon (U+003B).
    if (source.charCodeAt(index) === 0x3B) {
        lex();

        if (!(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
        }

        return astNodeFactory.createBreakStatement(null);
    }

    if (peekLineTerminator()) {
        if (!(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
        }

        return astNodeFactory.createBreakStatement(null);
    }

    if (lookahead.type === Token.Identifier) {
        label = parseVariableIdentifier();

        if (!state.labelSet.has(label.name)) {
            throwError({}, Messages.UnknownLabel, label.name);
        }
    }

    consumeSemicolon();

    if (label === null && !(state.inIteration || state.inSwitch)) {
        throwError({}, Messages.IllegalBreak);
    }

    return astNodeFactory.createBreakStatement(label);
}

// 12.9 The return statement

function parseReturnStatement() {
    var argument = null;

    expectKeyword("return");

    if (!state.inFunctionBody && !extra.ecmaFeatures.globalReturn) {
        throwErrorTolerant({}, Messages.IllegalReturn);
    }

    // "return" followed by a space and an identifier is very common.
    if (source.charCodeAt(index) === 0x20) {
        if (syntax.isIdentifierStart(source.charCodeAt(index + 1))) {
            argument = parseExpression();
            consumeSemicolon();
            return astNodeFactory.createReturnStatement(argument);
        }
    }

    if (peekLineTerminator()) {
        return astNodeFactory.createReturnStatement(null);
    }

    if (!match(";")) {
        if (!match("}") && lookahead.type !== Token.EOF) {
            argument = parseExpression();
        }
    }

    consumeSemicolon();

    return astNodeFactory.createReturnStatement(argument);
}

// 12.10 The with statement

function parseWithStatement() {
    var object, body;

    if (strict) {
        // TODO(ikarienator): Should we update the test cases instead?
        skipComment();
        throwErrorTolerant({}, Messages.StrictModeWith);
    }

    expectKeyword("with");

    expect("(");

    object = parseExpression();

    expect(")");

    body = parseStatement();

    return astNodeFactory.createWithStatement(object, body);
}

// 12.10 The swith statement

function parseSwitchCase() {
    var test, consequent = [], statement,
        marker = markerCreate();

    if (matchKeyword("default")) {
        lex();
        test = null;
    } else {
        expectKeyword("case");
        test = parseExpression();
    }
    expect(":");

    while (index < length) {
        if (match("}") || matchKeyword("default") || matchKeyword("case")) {
            break;
        }
        statement = parseSourceElement();
        consequent.push(statement);
    }

    return markerApply(marker, astNodeFactory.createSwitchCase(test, consequent));
}

function parseSwitchStatement() {
    var discriminant, cases, clause, oldInSwitch, defaultFound;

    expectKeyword("switch");

    expect("(");

    discriminant = parseExpression();

    expect(")");

    expect("{");

    cases = [];

    if (match("}")) {
        lex();
        return astNodeFactory.createSwitchStatement(discriminant, cases);
    }

    oldInSwitch = state.inSwitch;
    state.inSwitch = true;
    defaultFound = false;

    while (index < length) {
        if (match("}")) {
            break;
        }
        clause = parseSwitchCase();
        if (clause.test === null) {
            if (defaultFound) {
                throwError({}, Messages.MultipleDefaultsInSwitch);
            }
            defaultFound = true;
        }
        cases.push(clause);
    }

    state.inSwitch = oldInSwitch;

    expect("}");

    return astNodeFactory.createSwitchStatement(discriminant, cases);
}

// 12.13 The throw statement

function parseThrowStatement() {
    var argument;

    expectKeyword("throw");

    if (peekLineTerminator()) {
        throwError({}, Messages.NewlineAfterThrow);
    }

    argument = parseExpression();

    consumeSemicolon();

    return astNodeFactory.createThrowStatement(argument);
}

// 12.14 The try statement

function parseCatchClause() {
    var param, body,
        marker = markerCreate();

    expectKeyword("catch");

    expect("(");
    if (match(")")) {
        throwUnexpected(lookahead);
    }

    param = parseVariableIdentifier();
    // 12.14.1
    if (strict && syntax.isRestrictedWord(param.name)) {
        throwErrorTolerant({}, Messages.StrictCatchVariable);
    }

    expect(")");
    body = parseBlock();
    return markerApply(marker, astNodeFactory.createCatchClause(param, body));
}

function parseTryStatement() {
    var block, handler = null, finalizer = null;

    expectKeyword("try");

    block = parseBlock();

    if (matchKeyword("catch")) {
        handler = parseCatchClause();
    }

    if (matchKeyword("finally")) {
        lex();
        finalizer = parseBlock();
    }

    if (!handler && !finalizer) {
        throwError({}, Messages.NoCatchOrFinally);
    }

    return astNodeFactory.createTryStatement(block, handler, finalizer);
}

// 12.15 The debugger statement

function parseDebuggerStatement() {
    expectKeyword("debugger");

    consumeSemicolon();

    return astNodeFactory.createDebuggerStatement();
}

// 12 Statements

function parseStatement() {
    var type = lookahead.type,
        expr,
        labeledBody,
        marker;

    if (type === Token.EOF) {
        throwUnexpected(lookahead);
    }

    if (type === Token.Punctuator && lookahead.value === "{") {
        return parseBlock();
    }

    marker = markerCreate();

    if (type === Token.Punctuator) {
        switch (lookahead.value) {
            case ";":
                return markerApply(marker, parseEmptyStatement());
            case "{":
                return parseBlock();
            case "(":
                return markerApply(marker, parseExpressionStatement());
            default:
                break;
        }
    }

    marker = markerCreate();

    if (type === Token.Keyword) {
        switch (lookahead.value) {
            case "break":
                return markerApply(marker, parseBreakStatement());
            case "continue":
                return markerApply(marker, parseContinueStatement());
            case "debugger":
                return markerApply(marker, parseDebuggerStatement());
            case "do":
                return markerApply(marker, parseDoWhileStatement());
            case "for":
                return markerApply(marker, parseForStatement());
            case "function":
                return markerApply(marker, parseFunctionDeclaration());
            case "if":
                return markerApply(marker, parseIfStatement());
            case "return":
                return markerApply(marker, parseReturnStatement());
            case "switch":
                return markerApply(marker, parseSwitchStatement());
            case "throw":
                return markerApply(marker, parseThrowStatement());
            case "try":
                return markerApply(marker, parseTryStatement());
            case "var":
                return markerApply(marker, parseVariableStatement());
            case "while":
                return markerApply(marker, parseWhileStatement());
            case "with":
                return markerApply(marker, parseWithStatement());
            default:
                break;
        }
    }

    marker = markerCreate();
    expr = parseExpression();

    // 12.12 Labelled Statements
    if ((expr.type === astNodeTypes.Identifier) && match(":")) {
        lex();

        if (state.labelSet.has(expr.name)) {
            throwError({}, Messages.Redeclaration, "Label", expr.name);
        }

        state.labelSet.set(expr.name, true);
        labeledBody = parseStatement();
        state.labelSet.delete(expr.name);
        return markerApply(marker, astNodeFactory.createLabeledStatement(expr, labeledBody));
    }

    consumeSemicolon();

    return markerApply(marker, astNodeFactory.createExpressionStatement(expr));
}

// 13 Function Definition

// function parseConciseBody() {
//     if (match("{")) {
//         return parseFunctionSourceElements();
//     }
//     return parseAssignmentExpression();
// }

function parseFunctionSourceElements() {
    var sourceElement, sourceElements = [], token, directive, firstRestricted,
        oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, oldParenthesisCount,
        marker = markerCreate();

    expect("{");

    while (index < length) {
        if (lookahead.type !== Token.StringLiteral) {
            break;
        }
        token = lookahead;

        sourceElement = parseSourceElement();
        sourceElements.push(sourceElement);
        if (sourceElement.expression.type !== astNodeTypes.Literal) {
            // this is not directive
            break;
        }
        directive = source.slice(token.range[0] + 1, token.range[1] - 1);
        if (directive === "use strict") {
            strict = true;

            if (firstRestricted) {
                throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
            }
        } else {
            if (!firstRestricted && token.octal) {
                firstRestricted = token;
            }
        }
    }

    oldLabelSet = state.labelSet;
    oldInIteration = state.inIteration;
    oldInSwitch = state.inSwitch;
    oldInFunctionBody = state.inFunctionBody;
    oldParenthesisCount = state.parenthesizedCount;

    state.labelSet = new StringMap();
    state.inIteration = false;
    state.inSwitch = false;
    state.inFunctionBody = true;

    while (index < length) {

        if (match("}")) {
            break;
        }

        sourceElement = parseSourceElement();

        if (typeof sourceElement === "undefined") {
            break;
        }

        sourceElements.push(sourceElement);
    }

    expect("}");

    state.labelSet = oldLabelSet;
    state.inIteration = oldInIteration;
    state.inSwitch = oldInSwitch;
    state.inFunctionBody = oldInFunctionBody;
    state.parenthesizedCount = oldParenthesisCount;

    return markerApply(marker, astNodeFactory.createBlockStatement(sourceElements));
}

function validateParam(options, param, name) {

    if (strict) {
        if (syntax.isRestrictedWord(name)) {
            options.stricted = param;
            options.message = Messages.StrictParamName;
        }

        if (options.paramSet.has(name)) {
            options.stricted = param;
            options.message = Messages.StrictParamDupe;
        }
    } else if (!options.firstRestricted) {
        if (syntax.isRestrictedWord(name)) {
            options.firstRestricted = param;
            options.message = Messages.StrictParamName;
        } else if (syntax.isStrictModeReservedWord(name)) {
            options.firstRestricted = param;
            options.message = Messages.StrictReservedWord;
        } else if (options.paramSet.has(name)) {
            options.firstRestricted = param;
            options.message = Messages.StrictParamDupe;
        }
    }
    options.paramSet.set(name, true);
}

function parseParam(options) {
    var token, rest, param, def,
        allowRestParams = extra.ecmaFeatures.restParams,
        allowDestructuring = extra.ecmaFeatures.destructuring,
        allowDefaultParams = extra.ecmaFeatures.defaultParams;


    token = lookahead;
    if (token.value === "...") {
        if (!allowRestParams) {
            throwUnexpected(lookahead);
        }
        token = lex();
        rest = true;
    }

    if (match("[")) {
        if (!allowDestructuring) {
            throwUnexpected(lookahead);
        }
        param = parseArrayInitialiser();
        reinterpretAsDestructuredParameter(options, param);
    } else if (match("{")) {
        if (rest) {
            throwError({}, Messages.ObjectPatternAsRestParameter);
        }
        if (!allowDestructuring) {
            throwUnexpected(lookahead);
        }
        param = parseObjectInitialiser();
        reinterpretAsDestructuredParameter(options, param);
    } else {
        param = parseVariableIdentifier();
        validateParam(options, token, token.value);
    }

    if (match("=")) {
        if (rest) {
            throwErrorTolerant(lookahead, Messages.DefaultRestParameter);
        }
        if (allowDefaultParams || allowDestructuring) {
            lex();
            def = parseAssignmentExpression();
            ++options.defaultCount;
        } else {
            throwUnexpected(lookahead);
        }
    }

    if (rest) {
        if (!match(")")) {
            throwError({}, Messages.ParameterAfterRestParameter);
        }
        options.rest = param;
        return false;
    }

    options.params.push(param);
    options.defaults.push(def ? def : null); // TODO: determine if null or undefined (see: #55)

    return !match(")");
}


function parseParams(firstRestricted) {
    var options;

    options = {
        params: [],
        defaultCount: 0,
        defaults: [],
        rest: null,
        firstRestricted: firstRestricted
    };

    expect("(");

    if (!match(")")) {
        options.paramSet = new StringMap();
        while (index < length) {
            if (!parseParam(options)) {
                break;
            }
            expect(",");
        }
    }

    expect(")");

    if (options.defaultCount === 0) {
        options.defaults = [];
    }

    return {
        params: options.params,
        defaults: options.defaults,
        rest: options.rest,
        stricted: options.stricted,
        firstRestricted: options.firstRestricted,
        message: options.message
    };
}

function parseFunctionDeclaration(identifierIsOptional) {
        var id = null, body, token, tmp, firstRestricted, message, previousStrict, previousYieldAllowed, generator,
            marker = markerCreate(),
            allowGenerators = extra.ecmaFeatures.generators;

        expectKeyword("function");

        generator = false;
        if (allowGenerators && match("*")) {
            lex();
            generator = true;
        }

        if (!identifierIsOptional || !match("(")) {

            token = lookahead;

            id = parseVariableIdentifier();

            if (strict) {
                if (syntax.isRestrictedWord(token.value)) {
                    throwErrorTolerant(token, Messages.StrictFunctionName);
                }
            } else {
                if (syntax.isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (syntax.isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }

        tmp = parseParams(firstRestricted);
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        previousYieldAllowed = state.yieldAllowed;
        state.yieldAllowed = generator;

        body = parseFunctionSourceElements();

        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && tmp.stricted) {
            throwErrorTolerant(tmp.stricted, message);
        }
        strict = previousStrict;
        state.yieldAllowed = previousYieldAllowed;

        return markerApply(
            marker,
            astNodeFactory.createFunctionDeclaration(
                id,
                tmp.params,
                tmp.defaults,
                body,
                tmp.rest,
                generator,
                false
            )
        );
    }

function parseFunctionExpression() {
    var token, id = null, firstRestricted, message, tmp, body, previousStrict, previousYieldAllowed, generator,
        marker = markerCreate(),
        allowGenerators = extra.ecmaFeatures.generators;

    expectKeyword("function");

    generator = false;

    if (allowGenerators && match("*")) {
        lex();
        generator = true;
    }

    if (!match("(")) {
        token = lookahead;
        id = parseVariableIdentifier();
        if (strict) {
            if (syntax.isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
            }
        } else {
            if (syntax.isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
            } else if (syntax.isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
            }
        }
    }

    tmp = parseParams(firstRestricted);
    firstRestricted = tmp.firstRestricted;
    if (tmp.message) {
        message = tmp.message;
    }

    previousStrict = strict;
    previousYieldAllowed = state.yieldAllowed;
    state.yieldAllowed = generator;

    body = parseFunctionSourceElements();

    if (strict && firstRestricted) {
        throwError(firstRestricted, message);
    }
    if (strict && tmp.stricted) {
        throwErrorTolerant(tmp.stricted, message);
    }
    strict = previousStrict;
    state.yieldAllowed = previousYieldAllowed;

    return markerApply(
        marker,
        astNodeFactory.createFunctionExpression(
            id,
            tmp.params,
            tmp.defaults,
            body,
            tmp.rest,
            generator,
            false
        )
    );
}

function parseYieldExpression() {
    var yieldToken, delegateFlag, expr, marker = markerCreate();

    yieldToken = lex();
    assert(yieldToken.value === "yield", "Called parseYieldExpression with non-yield lookahead.");

    if (!state.yieldAllowed) {
        throwErrorTolerant({}, Messages.IllegalYield);
    }

    delegateFlag = false;
    if (match("*")) {
        lex();
        delegateFlag = true;
    }

    expr = parseAssignmentExpression();

    return markerApply(marker, astNodeFactory.createYieldExpression(expr, delegateFlag));
}

// Modules grammar from:
// people.mozilla.org/~jorendorff/es6-draft.html

function parseModuleSpecifier() {
    var marker = markerCreate(),
        specifier;

    if (lookahead.type !== Token.StringLiteral) {
        throwError({}, Messages.InvalidModuleSpecifier);
    }
    specifier = astNodeFactory.createLiteralFromSource(lex(), source);
    return markerApply(marker, specifier);
}

function parseExportSpecifier() {
    var exported, local, marker = markerCreate();
    if (matchKeyword("default")) {
        lex();
        local = markerApply(marker, astNodeFactory.createIdentifier("default"));
        // export {default} from "something";
    } else {
        local = parseVariableIdentifier();
    }
    if (matchContextualKeyword("as")) {
        lex();
        exported = parseNonComputedProperty();
    }
    return markerApply(marker, astNodeFactory.createExportSpecifier(local, exported));
}

function parseExportNamedDeclaration() {
    var declaration = null,
        isExportFromIdentifier,
        src = null, specifiers = [],
        marker = markerCreate();

    expectKeyword("export");

    // non-default export
    if (lookahead.type === Token.Keyword) {
        // covers:
        // export var f = 1;
        switch (lookahead.value) {
            case "let":
            case "const":
            case "var":
            case "class":
            case "function":
                declaration = parseSourceElement();
                return markerApply(marker, astNodeFactory.createExportNamedDeclaration(declaration, specifiers, null));
            default:
                break;
        }
    }

    expect("{");
    if (!match("}")) {
        do {
            isExportFromIdentifier = isExportFromIdentifier || matchKeyword("default");
            specifiers.push(parseExportSpecifier());
        } while (match(",") && lex());
    }
    expect("}");

    if (matchContextualKeyword("from")) {
        // covering:
        // export {default} from "foo";
        // export {foo} from "foo";
        lex();
        src = parseModuleSpecifier();
        consumeSemicolon();
    } else if (isExportFromIdentifier) {
        // covering:
        // export {default}; // missing fromClause
        throwError({}, lookahead.value ?
                Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
    } else {
        // cover
        // export {foo};
        consumeSemicolon();
    }
    return markerApply(marker, astNodeFactory.createExportNamedDeclaration(declaration, specifiers, src));
}

function parseExportDefaultDeclaration() {
    var declaration = null,
        expression = null,
        possibleIdentifierToken,
        allowClasses = extra.ecmaFeatures.classes,
        marker = markerCreate();

    // covers:
    // export default ...
    expectKeyword("export");
    expectKeyword("default");

    if (matchKeyword("function") || matchKeyword("class")) {
        possibleIdentifierToken = lookahead2();
        if (possibleIdentifierToken.type === Token.Identifier) {
            // covers:
            // export default function foo () {}
            // export default class foo {}
            declaration = parseSourceElement();
            return markerApply(marker, astNodeFactory.createExportDefaultDeclaration(declaration));
        }
        // covers:
        // export default function () {}
        // export default class {}
        if (lookahead.value === "function") {
            declaration = parseFunctionDeclaration(true);
            return markerApply(marker, astNodeFactory.createExportDefaultDeclaration(declaration));
        } else if (allowClasses && lookahead.value === "class") {
            declaration = parseClassDeclaration(true);
            return markerApply(marker, astNodeFactory.createExportDefaultDeclaration(declaration));
        }
    }

    if (matchContextualKeyword("from")) {
        throwError({}, Messages.UnexpectedToken, lookahead.value);
    }

    // covers:
    // export default {};
    // export default [];
    // export default (1 + 2);
    if (match("{")) {
        expression = parseObjectInitialiser();
    } else if (match("[")) {
        expression = parseArrayInitialiser();
    } else {
        expression = parseAssignmentExpression();
    }
    consumeSemicolon();
    return markerApply(marker, astNodeFactory.createExportDefaultDeclaration(expression));
}


function parseExportAllDeclaration() {
    var src,
        marker = markerCreate();

    // covers:
    // export * from "foo";
    expectKeyword("export");
    expect("*");
    if (!matchContextualKeyword("from")) {
        throwError({}, lookahead.value ?
                Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
    }
    lex();
    src = parseModuleSpecifier();
    consumeSemicolon();

    return markerApply(marker, astNodeFactory.createExportAllDeclaration(src));
}

function parseExportDeclaration() {
    if (state.inFunctionBody) {
        throwError({}, Messages.IllegalExportDeclaration);
    }
    var declarationType = lookahead2().value;
    if (declarationType === "default") {
        return parseExportDefaultDeclaration();
    } else if (declarationType === "*") {
        return parseExportAllDeclaration();
    } else {
        return parseExportNamedDeclaration();
    }
}

function parseImportSpecifier() {
    // import {<foo as bar>} ...;
    var local, imported, marker = markerCreate();

    imported = parseNonComputedProperty();
    if (matchContextualKeyword("as")) {
        lex();
        local = parseVariableIdentifier();
    }

    return markerApply(marker, astNodeFactory.createImportSpecifier(local, imported));
}

function parseNamedImports() {
    var specifiers = [];
    // {foo, bar as bas}
    expect("{");
    if (!match("}")) {
        do {
            specifiers.push(parseImportSpecifier());
        } while (match(",") && lex());
    }
    expect("}");
    return specifiers;
}

function parseImportDefaultSpecifier() {
    // import <foo> ...;
    var local, marker = markerCreate();

    local = parseNonComputedProperty();

    return markerApply(marker, astNodeFactory.createImportDefaultSpecifier(local));
}

function parseImportNamespaceSpecifier() {
    // import <* as foo> ...;
    var local, marker = markerCreate();

    expect("*");
    if (!matchContextualKeyword("as")) {
        throwError({}, Messages.NoAsAfterImportNamespace);
    }
    lex();
    local = parseNonComputedProperty();

    return markerApply(marker, astNodeFactory.createImportNamespaceSpecifier(local));
}

function parseImportDeclaration() {
    var specifiers, src, marker = markerCreate();

    if (state.inFunctionBody) {
        throwError({}, Messages.IllegalImportDeclaration);
    }

    expectKeyword("import");
    specifiers = [];

    if (lookahead.type === Token.StringLiteral) {
        // covers:
        // import "foo";
        src = parseModuleSpecifier();
        consumeSemicolon();
        return markerApply(marker, astNodeFactory.createImportDeclaration(specifiers, src));
    }

    if (!matchKeyword("default") && isIdentifierName(lookahead)) {
        // covers:
        // import foo
        // import foo, ...
        specifiers.push(parseImportDefaultSpecifier());
        if (match(",")) {
            lex();
        }
    }
    if (match("*")) {
        // covers:
        // import foo, * as foo
        // import * as foo
        specifiers.push(parseImportNamespaceSpecifier());
    } else if (match("{")) {
        // covers:
        // import foo, {bar}
        // import {bar}
        specifiers = specifiers.concat(parseNamedImports());
    }

    if (!matchContextualKeyword("from")) {
        throwError({}, lookahead.value ?
                Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
    }
    lex();
    src = parseModuleSpecifier();
    consumeSemicolon();

    return markerApply(marker, astNodeFactory.createImportDeclaration(specifiers, src));
}

// 14 Functions and classes

// 14.1 Functions is defined above (13 in ES5)
// 14.2 Arrow Functions Definitions is defined in (7.3 assignments)

// 14.3 Method Definitions
// 14.3.7

// 14.5 Class Definitions

function parseClassBody() {
    var token, isStatic, hasConstructor = false, body = [], method, computed, key;

    var existingProps = {},
        topMarker = markerCreate(),
        marker;

    existingProps.static = new StringMap();
    existingProps.prototype = new StringMap();

    expect("{");

    while (!match("}")) {

        // extra semicolons are fine
        if (match(";")) {
            lex();
            continue;
        }

        token = lookahead;
        isStatic = false;
        computed = match("[");
        marker = markerCreate();
        key = parseObjectPropertyKey();

        if (key.name === "static" && lookaheadPropertyName()) {
            token = lookahead;
            isStatic = true;
            computed = match("[");
            key = parseObjectPropertyKey();
        }

        method = tryParseMethodDefinition(token, key, computed, marker);

        if (method) {
            method.static = isStatic;
            if (method.kind === "init") {
                method.kind = "method";
            }

            if (!isStatic) {
                if (!method.computed && (method.key.name || method.key.value.toString()) === "constructor") {
                    if (method.kind !== "method" || !method.method || method.value.generator) {
                        throwUnexpected(token, Messages.ConstructorSpecialMethod);
                    }
                    if (hasConstructor) {
                        throwUnexpected(token, Messages.DuplicateConstructor);
                    } else {
                        hasConstructor = true;
                    }
                    method.kind = "constructor";
                }
            } else {
                if (!method.computed && (method.key.name || method.key.value.toString()) === "prototype") {
                    throwUnexpected(token, Messages.StaticPrototype);
                }
            }
            method.type = astNodeTypes.MethodDefinition;
            delete method.method;
            delete method.shorthand;
            body.push(method);
        } else {
            throwUnexpected(lookahead);
        }
    }

    lex();
    return markerApply(topMarker, astNodeFactory.createClassBody(body));
}

function parseClassExpression() {
    var id = null, superClass = null, marker = markerCreate(),
        previousStrict = strict, classBody;

    // classes run in strict mode
    strict = true;

    expectKeyword("class");

    if (lookahead.type === Token.Identifier) {
        id = parseVariableIdentifier();
    }

    if (matchKeyword("extends")) {
        lex();
        superClass = parseLeftHandSideExpressionAllowCall();
    }

    classBody = parseClassBody();
    strict = previousStrict;

    return markerApply(marker, astNodeFactory.createClassExpression(id, superClass, classBody));
}

function parseClassDeclaration(identifierIsOptional) {
    var id = null, superClass = null, marker = markerCreate(),
        previousStrict = strict, classBody;

    // classes run in strict mode
    strict = true;

    expectKeyword("class");

    if (!identifierIsOptional || lookahead.type === Token.Identifier) {
        id = parseVariableIdentifier();
    }

    if (matchKeyword("extends")) {
        lex();
        superClass = parseLeftHandSideExpressionAllowCall();
    }

    classBody = parseClassBody();
    strict = previousStrict;

    return markerApply(marker, astNodeFactory.createClassDeclaration(id, superClass, classBody));
}

// 15 Program

function parseSourceElement() {

    var allowClasses = extra.ecmaFeatures.classes,
        allowModules = extra.ecmaFeatures.modules,
        allowBlockBindings = extra.ecmaFeatures.blockBindings;

    if (lookahead.type === Token.Keyword) {
        switch (lookahead.value) {
            case "export":
                if (!allowModules) {
                    throwErrorTolerant({}, Messages.IllegalExportDeclaration);
                }
                return parseExportDeclaration();
            case "import":
                if (!allowModules) {
                    throwErrorTolerant({}, Messages.IllegalImportDeclaration);
                }
                return parseImportDeclaration();
            case "function":
                return parseFunctionDeclaration();
            case "class":
                if (allowClasses) {
                    return parseClassDeclaration();
                }
                break;
            case "const":
            case "let":
                if (allowBlockBindings) {
                    return parseConstLetDeclaration(lookahead.value);
                }
                /* falls through */
            default:
                return parseStatement();
        }
    }

    if (lookahead.type !== Token.EOF) {
        return parseStatement();
    }
}

function parseSourceElements() {
    var sourceElement, sourceElements = [], token, directive, firstRestricted;

    while (index < length) {
        token = lookahead;
        if (token.type !== Token.StringLiteral) {
            break;
        }

        sourceElement = parseSourceElement();
        sourceElements.push(sourceElement);
        if (sourceElement.expression.type !== astNodeTypes.Literal) {
            // this is not directive
            break;
        }
        directive = source.slice(token.range[0] + 1, token.range[1] - 1);
        if (directive === "use strict") {
            strict = true;
            if (firstRestricted) {
                throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
            }
        } else {
            if (!firstRestricted && token.octal) {
                firstRestricted = token;
            }
        }
    }

    while (index < length) {
        sourceElement = parseSourceElement();
        /* istanbul ignore if */
        if (typeof sourceElement === "undefined") {
            break;
        }
        sourceElements.push(sourceElement);
    }
    return sourceElements;
}

function parseProgram() {
    var body,
        marker;

    skipComment();
    peek();
    marker = markerCreate();
    strict = extra.ecmaFeatures.modules;

    body = parseSourceElements();
    return markerApply(marker, astNodeFactory.createProgram(body));
}

function filterTokenLocation() {
    var i, entry, token, tokens = [];

    for (i = 0; i < extra.tokens.length; ++i) {
        entry = extra.tokens[i];
        token = {
            type: entry.type,
            value: entry.value
        };
        if (entry.regex) {
            token.regex = {
                pattern: entry.regex.pattern,
                flags: entry.regex.flags
            };
        }
        if (extra.range) {
            token.range = entry.range;
        }
        if (extra.loc) {
            token.loc = entry.loc;
        }
        tokens.push(token);
    }

    extra.tokens = tokens;
}

//------------------------------------------------------------------------------
// Tokenizer
//------------------------------------------------------------------------------

function tokenize(code, options) {
    var toString,
        tokens;

    toString = String;
    if (typeof code !== "string" && !(code instanceof String)) {
        code = toString(code);
    }

    source = code;
    index = 0;
    lineNumber = (source.length > 0) ? 1 : 0;
    lineStart = 0;
    length = source.length;
    lookahead = null;
    state = {
        allowIn: true,
        labelSet: {},
        parenthesisCount: 0,
        inFunctionBody: false,
        inIteration: false,
        inSwitch: false,
        lastCommentStart: -1,
        yieldAllowed: false,
        inJSXSpreadAttribute: false,
        inJSXChild: false,
        inJSXTag: false
    };

    extra = {
        ecmaFeatures: defaultFeatures
    };

    // Options matching.
    options = options || {};

    // Of course we collect tokens here.
    options.tokens = true;
    extra.tokens = [];
    extra.tokenize = true;

    // The following two fields are necessary to compute the Regex tokens.
    extra.openParenToken = -1;
    extra.openCurlyToken = -1;

    // Needed when using template string tokenization
    extra.curlies = [];

    extra.range = (typeof options.range === "boolean") && options.range;
    extra.loc = (typeof options.loc === "boolean") && options.loc;

    if (typeof options.comment === "boolean" && options.comment) {
        extra.comments = [];
    }
    if (typeof options.tolerant === "boolean" && options.tolerant) {
        extra.errors = [];
    }

    // apply parsing flags
    if (options.ecmaFeatures && typeof options.ecmaFeatures === "object") {
        extra.ecmaFeatures = options.ecmaFeatures;
    }

    try {
        peek();
        if (lookahead.type === Token.EOF) {
            return extra.tokens;
        }

        lex();
        while (lookahead.type !== Token.EOF) {
            try {
                lex();
            } catch (lexError) {
                if (extra.errors) {
                    extra.errors.push(lexError);
                    // We have to break on the first error
                    // to avoid infinite loops.
                    break;
                } else {
                    throw lexError;
                }
            }
        }

        filterTokenLocation();
        tokens = extra.tokens;

        if (typeof extra.comments !== "undefined") {
            tokens.comments = extra.comments;
        }
        if (typeof extra.errors !== "undefined") {
            tokens.errors = extra.errors;
        }
    } catch (e) {
        throw e;
    } finally {
        extra = {};
    }
    return tokens;
}

//------------------------------------------------------------------------------
// Parser
//------------------------------------------------------------------------------

function parse(code, options) {
    var program, toString;

    toString = String;
    if (typeof code !== "string" && !(code instanceof String)) {
        code = toString(code);
    }

    source = code;
    index = 0;
    lineNumber = (source.length > 0) ? 1 : 0;
    lineStart = 0;
    length = source.length;
    lookahead = null;
    state = {
        allowIn: true,
        labelSet: new StringMap(),
        parenthesisCount: 0,
        inFunctionBody: false,
        inIteration: false,
        inSwitch: false,
        lastCommentStart: -1,
        yieldAllowed: false,
        inJSXSpreadAttribute: false,
        inJSXChild: false,
        inJSXTag: false
    };

    extra = {
        ecmaFeatures: Object.create(defaultFeatures)
    };

    // for template strings
    extra.curlies = [];

    if (typeof options !== "undefined") {
        extra.range = (typeof options.range === "boolean") && options.range;
        extra.loc = (typeof options.loc === "boolean") && options.loc;
        extra.attachComment = (typeof options.attachComment === "boolean") && options.attachComment;

        if (extra.loc && options.source !== null && options.source !== undefined) {
            extra.source = toString(options.source);
        }

        if (typeof options.tokens === "boolean" && options.tokens) {
            extra.tokens = [];
        }
        if (typeof options.comment === "boolean" && options.comment) {
            extra.comments = [];
        }
        if (typeof options.tolerant === "boolean" && options.tolerant) {
            extra.errors = [];
        }
        if (extra.attachComment) {
            extra.range = true;
            extra.comments = [];
            commentAttachment.reset();
        }

        if (options.sourceType === "module") {
            extra.ecmaFeatures = {
                arrowFunctions: true,
                blockBindings: true,
                regexUFlag: true,
                regexYFlag: true,
                templateStrings: true,
                binaryLiterals: true,
                octalLiterals: true,
                unicodeCodePointEscapes: true,
                superInFunctions: true,
                defaultParams: true,
                restParams: true,
                forOf: true,
                objectLiteralComputedProperties: true,
                objectLiteralShorthandMethods: true,
                objectLiteralShorthandProperties: true,
                objectLiteralDuplicateProperties: true,
                generators: true,
                destructuring: true,
                classes: true,
                modules: true
            };
        }

        // apply parsing flags after sourceType to allow overriding
        if (options.ecmaFeatures && typeof options.ecmaFeatures === "object") {

            // if it's a module, augment the ecmaFeatures
            if (options.sourceType === "module") {
                Object.keys(options.ecmaFeatures).forEach(function(key) {
                    extra.ecmaFeatures[key] = options.ecmaFeatures[key];
                });
            } else {
                extra.ecmaFeatures = options.ecmaFeatures;
            }
        }

    }

    try {
        program = parseProgram();
        if (typeof extra.comments !== "undefined") {
            program.comments = extra.comments;
        }
        if (typeof extra.tokens !== "undefined") {
            filterTokenLocation();
            program.tokens = extra.tokens;
        }
        if (typeof extra.errors !== "undefined") {
            program.errors = extra.errors;
        }
    } catch (e) {
        throw e;
    } finally {
        extra = {};
    }

    return program;
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

exports.version = require("./package.json").version;

exports.tokenize = tokenize;

exports.parse = parse;

// Deep copy.
/* istanbul ignore next */
exports.Syntax = (function () {
    var name, types = {};

    if (typeof Object.create === "function") {
        types = Object.create(null);
    }

    for (name in astNodeTypes) {
        if (astNodeTypes.hasOwnProperty(name)) {
            types[name] = astNodeTypes[name];
        }
    }

    if (typeof Object.freeze === "function") {
        Object.freeze(types);
    }

    return types;
}());

},{"./lib/ast-node-factory":1,"./lib/ast-node-types":2,"./lib/comment-attachment":3,"./lib/features":4,"./lib/messages":5,"./lib/string-map":6,"./lib/syntax":7,"./lib/token-info":8,"./lib/xhtml-entities":9,"./package.json":10}]},{},[]);

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.eslint=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @fileoverview Defines environment settings and globals.
 * @author Elan Shanker
 * @copyright 2014 Elan Shanker. All rights reserved.
 */
"use strict";

var globals = require("globals");

module.exports = {
    builtin: globals.builtin,
    browser: {
        globals: globals.browser
    },
    node: {
        globals: globals.node,
        ecmaFeatures: {
            globalReturn: true
        },
        rules: {
            "no-catch-shadow": 0,
            "no-console": 0,
            "no-mixed-requires": 2,
            "no-new-require": 2,
            "no-path-concat": 2,
            "no-process-exit": 2,
            "global-strict": [0, "always"],
            "handle-callback-err": [2, "err"]
        }
    },
    amd: {
        globals: globals.amd
    },
    mocha: {
        globals: globals.mocha
    },
    jasmine: {
        globals: globals.jasmine
    },
    phantomjs: {
        globals: globals.phantom
    },
    jquery: {
        globals: globals.jquery
    },
    prototypejs: {
        globals: globals.prototypejs
    },
    shelljs: {
        globals: globals.shelljs
    },
    meteor: {
        globals: globals.meteor
    },
    es6: {
        ecmaFeatures: {
            arrowFunctions: true,
            blockBindings: true,
            regexUFlag: true,
            regexYFlag: true,
            templateStrings: true,
            binaryLiterals: true,
            octalLiterals: true,
            unicodeCodePointEscapes: true,
            superInFunctions: true,
            defaultParams: true,
            restParams: true,
            forOf: true,
            objectLiteralComputedProperties: true,
            objectLiteralShorthandMethods: true,
            objectLiteralShorthandProperties: true,
            objectLiteralDuplicateProperties: true,
            generators: true,
            destructuring: true,
            classes: true
        }
    }
};

},{"globals":126}],2:[function(require,module,exports){
module.exports={
    "ecmaFeatures": {},
    "parser": "espree",
    "env": {
        "browser": false,
        "node": false,
        "amd": false,
        "mocha": false,
        "jasmine": false
    },

    "rules": {
        "no-alert": 2,
        "no-array-constructor": 2,
        "no-bitwise": 0,
        "no-caller": 2,
        "no-catch-shadow": 2,
        "no-comma-dangle": 0,
        "no-cond-assign": 2,
        "no-console": 2,
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-debugger": 2,
        "no-delete-var": 2,
        "no-div-regex": 0,
        "no-dupe-keys": 2,
        "no-dupe-args": 2,
        "no-else-return": 0,
        "no-empty": 2,
        "no-empty-class": 2,
        "no-empty-label": 2,
        "no-eq-null": 0,
        "no-eval": 2,
        "no-ex-assign": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-parens": 0,
        "no-extra-semi": 2,
        "no-extra-strict": 2,
        "no-fallthrough": 2,
        "no-floating-decimal": 0,
        "no-func-assign": 2,
        "no-implied-eval": 2,
        "no-inline-comments": 0,
        "no-inner-declarations": [2, "functions"],
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-iterator": 2,
        "no-label-var": 2,
        "no-labels": 2,
        "no-lone-blocks": 2,
        "no-lonely-if": 0,
        "no-loop-func": 2,
        "no-mixed-requires": [0, false],
        "no-mixed-spaces-and-tabs": [2, false],
        "no-multi-spaces": 2,
        "no-multi-str": 2,
        "no-multiple-empty-lines": [0, {"max": 2}],
        "no-native-reassign": 2,
        "no-negated-in-lhs": 2,
        "no-nested-ternary": 0,
        "no-new": 2,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-new-require": 0,
        "no-new-wrappers": 2,
        "no-obj-calls": 2,
        "no-octal": 2,
        "no-octal-escape": 2,
        "no-path-concat": 0,
        "no-plusplus": 0,
        "no-process-env": 0,
        "no-process-exit": 2,
        "no-proto": 2,
        "no-redeclare": 2,
        "no-regex-spaces": 2,
        "no-reserved-keys": 0,
        "no-restricted-modules": 0,
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-self-compare": 0,
        "no-sequences": 2,
        "no-shadow": 2,
        "no-shadow-restricted-names": 2,
        "no-space-before-semi": 0,
        "no-spaced-func": 2,
        "no-sparse-arrays": 2,
        "no-sync": 0,
        "no-ternary": 0,
        "no-trailing-spaces": 2,
        "no-throw-literal": 0,
        "no-undef": 2,
        "no-undef-init": 2,
        "no-undefined": 0,
        "no-underscore-dangle": 2,
        "no-unreachable": 2,
        "no-unused-expressions": 2,
        "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],
        "no-use-before-define": 2,
        "no-void": 0,
        "no-var": 0,
        "no-warning-comments": [0, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],
        "no-with": 2,
        "no-wrap-func": 2,

        "block-scoped-var": 0,
        "brace-style": [0, "1tbs"],
        "camelcase": 2,
        "comma-dangle": [2, "never"],
        "comma-spacing": 2,
        "comma-style": 0,
        "complexity": [0, 11],
        "consistent-return": 2,
        "consistent-this": [0, "that"],
        "curly": [2, "all"],
        "default-case": 0,
        "dot-notation": [2, { "allowKeywords": true }],
        "eol-last": 2,
        "eqeqeq": 2,
        "func-names": 0,
        "func-style": [0, "declaration"],
        "generator-star": 0,
        "global-strict": [2, "never"],
        "guard-for-in": 0,
        "handle-callback-err": 0,
        "indent": 0,
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "max-depth": [0, 4],
        "max-len": [0, 80, 4],
        "max-nested-callbacks": [0, 2],
        "max-params": [0, 3],
        "max-statements": [0, 10],
        "new-cap": 2,
        "new-parens": 2,
        "one-var": 0,
        "operator-assignment": [0, "always"],
        "padded-blocks": 0,
        "quote-props": 0,
        "quotes": [2, "double"],
        "radix": 0,
        "semi": 2,
        "semi-spacing": [2, {"before": false, "after": true}],
        "sort-vars": 0,
        "space-after-function-name": [0, "never"],
        "space-after-keywords": [0, "always"],
        "space-before-blocks": [0, "always"],
        "space-before-function-parentheses": [0, "always"],
        "space-in-brackets": [0, "never"],
        "space-in-parens": [0, "never"],
        "space-infix-ops": 2,
        "space-return-throw-case": 2,
        "space-unary-ops": [2, { "words": true, "nonwords": false }],
        "spaced-line-comment": [0, "always"],
        "strict": 2,
        "use-isnan": 2,
        "valid-jsdoc": 0,
        "valid-typeof": 2,
        "vars-on-top": 0,
        "wrap-iife": 0,
        "wrap-regex": 0,
        "yoda": [2, "never"]
    }
}

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],4:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],7:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":6,"_process":5,"inherits":4}],8:[function(require,module,exports){
/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Dan Tao <daniel.tao@gmail.com>
  Copyright (C) 2013 Andrew Eisenberg <andrew@eisenberg.as>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var VERSION,
        typed,
        jsdoc,
        esutils,
        isArray,
        hasOwnProperty;

    // Sync with package.json.
    VERSION = require('./package.json').version;

    esutils = require('esutils');

    function sliceSource(source, index, last) {
        return source.slice(index, last);
    }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(ary) {
            return Object.prototype.toString.call(ary) === '[object Array]';
        };
    }

    hasOwnProperty = (function () {
        var func = Object.prototype.hasOwnProperty;
        return function hasOwnProperty(obj, name) {
            return func.call(obj, name);
        };
    }());

    function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }

    function isASCIIAlphanumeric(ch) {
        return (ch >= 0x61  /* 'a' */ && ch <= 0x7A  /* 'z' */) ||
            (ch >= 0x41  /* 'A' */ && ch <= 0x5A  /* 'Z' */) ||
            (ch >= 0x30  /* '0' */ && ch <= 0x39  /* '9' */);
    }

    function isTypeName(ch) {
        return '><(){}[],:*|?!='.indexOf(String.fromCharCode(ch)) === -1 && !esutils.code.isWhiteSpace(ch) && !esutils.code.isLineTerminator(ch);
    }

    function isParamTitle(title) {
        return title === 'param' || title === 'argument' || title === 'arg';
    }

    function isProperty(title) {
        return title === 'property' || title === 'prop';
    }

    function isNameParameterRequired(title) {
        return isParamTitle(title) || isProperty(title) ||
            title === 'alias' || title === 'this' || title === 'mixes' || title === 'requires';
    }

    function isAllowedName(title) {
        return isNameParameterRequired(title) || title === 'const' || title === 'constant';
    }

    function isAllowedNested(title) {
        return isProperty(title) || isParamTitle(title);
    }

    function isTypeParameterRequired(title) {
        return isParamTitle(title) || title === 'define' || title === 'enum' ||
            title === 'implements' || title === 'return' ||
            title === 'this' || title === 'type' || title === 'typedef' ||
            title === 'returns' || isProperty(title);
    }

    // Consider deprecation instead using 'isTypeParameterRequired' and 'Rules' declaration to pick when a type is optional/required
    // This would require changes to 'parseType'
    function isAllowedType(title) {
        return isTypeParameterRequired(title) || title === 'throws' || title === 'const' || title === 'constant' ||
            title === 'namespace' || title === 'member' || title === 'var' || title === 'module' ||
            title === 'constructor' || title === 'class' || title === 'extends' || title === 'augments' ||
            title === 'public' || title === 'private' || title === 'protected';
    }

    function DoctrineError(message) {
        this.name = 'DoctrineError';
        this.message = message;
    }
    DoctrineError.prototype = (function () {
        var Middle = function () { };
        Middle.prototype = Error.prototype;
        return new Middle();
    }());
    DoctrineError.prototype.constructor = DoctrineError;

    function throwError(message) {
        throw new DoctrineError(message);
    }

    function assert(cond, text) {
        if (VERSION.slice(-3) === 'dev') {
            if (!cond) {
                throwError(text);
            }
        }
    }

    function trim(str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    function unwrapComment(doc) {
        // JSDoc comment is following form
        //   /**
        //    * .......
        //    */
        // remove /**, */ and *
        var BEFORE_STAR = 0,
            STAR = 1,
            AFTER_STAR = 2,
            index,
            len,
            mode,
            result,
            ch;

        doc = doc.replace(/^\/\*\*?/, '').replace(/\*\/$/, '');
        index = 0;
        len = doc.length;
        mode = BEFORE_STAR;
        result = '';

        while (index < len) {
            ch = doc.charCodeAt(index);
            switch (mode) {
            case BEFORE_STAR:
                if (esutils.code.isLineTerminator(ch)) {
                    result += String.fromCharCode(ch);
                } else if (ch === 0x2A  /* '*' */) {
                    mode = STAR;
                } else if (!esutils.code.isWhiteSpace(ch)) {
                    result += String.fromCharCode(ch);
                    mode = AFTER_STAR;
                }
                break;

            case STAR:
                if (!esutils.code.isWhiteSpace(ch)) {
                    result += String.fromCharCode(ch);
                }
                mode = esutils.code.isLineTerminator(ch) ? BEFORE_STAR : AFTER_STAR;
                break;

            case AFTER_STAR:
                result += String.fromCharCode(ch);
                if (esutils.code.isLineTerminator(ch)) {
                    mode = BEFORE_STAR;
                }
                break;
            }
            index += 1;
        }

        return result;
    }

    // Type Expression Parser

    (function (exports) {
        var Syntax,
            Token,
            source,
            length,
            index,
            previous,
            token,
            value;

        Syntax = {
            NullableLiteral: 'NullableLiteral',
            AllLiteral: 'AllLiteral',
            NullLiteral: 'NullLiteral',
            UndefinedLiteral: 'UndefinedLiteral',
            VoidLiteral: 'VoidLiteral',
            UnionType: 'UnionType',
            ArrayType: 'ArrayType',
            RecordType: 'RecordType',
            FieldType: 'FieldType',
            FunctionType: 'FunctionType',
            ParameterType: 'ParameterType',
            RestType: 'RestType',
            NonNullableType: 'NonNullableType',
            OptionalType: 'OptionalType',
            NullableType: 'NullableType',
            NameExpression: 'NameExpression',
            TypeApplication: 'TypeApplication'
        };

        Token = {
            ILLEGAL: 0,    // ILLEGAL
            DOT_LT: 1,     // .<
            REST: 2,       // ...
            LT: 3,         // <
            GT: 4,         // >
            LPAREN: 5,     // (
            RPAREN: 6,     // )
            LBRACE: 7,     // {
            RBRACE: 8,     // }
            LBRACK: 9,    // [
            RBRACK: 10,    // ]
            COMMA: 11,     // ,
            COLON: 12,     // :
            STAR: 13,      // *
            PIPE: 14,      // |
            QUESTION: 15,  // ?
            BANG: 16,      // !
            EQUAL: 17,     // =
            NAME: 18,      // name token
            STRING: 19,    // string
            NUMBER: 20,    // number
            EOF: 21
        };

        function Context(previous, index, token, value) {
            this._previous = previous;
            this._index = index;
            this._token = token;
            this._value = value;
        }

        Context.prototype.restore = function () {
            previous = this._previous;
            index = this._index;
            token = this._token;
            value = this._value;
        };

        Context.save = function () {
            return new Context(previous, index, token, value);
        };

        function advance() {
            var ch = source.charAt(index);
            index += 1;
            return ch;
        }

        function scanHexEscape(prefix) {
            var i, len, ch, code = 0;

            len = (prefix === 'u') ? 4 : 2;
            for (i = 0; i < len; ++i) {
                if (index < length && esutils.code.isHexDigit(source.charCodeAt(index))) {
                    ch = advance();
                    code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
                } else {
                    return '';
                }
            }
            return String.fromCharCode(code);
        }

        function scanString() {
            var str = '', quote, ch, code, unescaped, restore; //TODO review removal octal = false
            quote = source.charAt(index);
            ++index;

            while (index < length) {
                ch = advance();

                if (ch === quote) {
                    quote = '';
                    break;
                } else if (ch === '\\') {
                    ch = advance();
                    if (!esutils.code.isLineTerminator(ch.charCodeAt(0))) {
                        switch (ch) {
                        case 'n':
                            str += '\n';
                            break;
                        case 'r':
                            str += '\r';
                            break;
                        case 't':
                            str += '\t';
                            break;
                        case 'u':
                        case 'x':
                            restore = index;
                            unescaped = scanHexEscape(ch);
                            if (unescaped) {
                                str += unescaped;
                            } else {
                                index = restore;
                                str += ch;
                            }
                            break;
                        case 'b':
                            str += '\b';
                            break;
                        case 'f':
                            str += '\f';
                            break;
                        case 'v':
                            str += '\v';
                            break;

                        default:
                            if (esutils.code.isOctalDigit(ch.charCodeAt(0))) {
                                code = '01234567'.indexOf(ch);

                                // \0 is not octal escape sequence
                                // Deprecating unused code. TODO review removal
                                //if (code !== 0) {
                                //    octal = true;
                                //}

                                if (index < length && esutils.code.isOctalDigit(source.charCodeAt(index))) {
                                    //TODO Review Removal octal = true;
                                    code = code * 8 + '01234567'.indexOf(advance());

                                    // 3 digits are only allowed when string starts
                                    // with 0, 1, 2, 3
                                    if ('0123'.indexOf(ch) >= 0 &&
                                            index < length &&
                                            esutils.code.isOctalDigit(source.charCodeAt(index))) {
                                        code = code * 8 + '01234567'.indexOf(advance());
                                    }
                                }
                                str += String.fromCharCode(code);
                            } else {
                                str += ch;
                            }
                            break;
                        }
                    } else {
                        if (ch ===  '\r' && source.charCodeAt(index) === 0x0A  /* '\n' */) {
                            ++index;
                        }
                    }
                } else if (esutils.code.isLineTerminator(ch.charCodeAt(0))) {
                    break;
                } else {
                    str += ch;
                }
            }

            if (quote !== '') {
                throwError('unexpected quote');
            }

            value = str;
            return Token.STRING;
        }

        function scanNumber() {
            var number, ch;

            number = '';
            ch = source.charCodeAt(index);

            if (ch !== 0x2E  /* '.' */) {
                number = advance();
                ch = source.charCodeAt(index);

                if (number === '0') {
                    if (ch === 0x78  /* 'x' */ || ch === 0x58  /* 'X' */) {
                        number += advance();
                        while (index < length) {
                            ch = source.charCodeAt(index);
                            if (!esutils.code.isHexDigit(ch)) {
                                break;
                            }
                            number += advance();
                        }

                        if (number.length <= 2) {
                            // only 0x
                            throwError('unexpected token');
                        }

                        if (index < length) {
                            ch = source.charCodeAt(index);
                            if (esutils.code.isIdentifierStart(ch)) {
                                throwError('unexpected token');
                            }
                        }
                        value = parseInt(number, 16);
                        return Token.NUMBER;
                    }

                    if (esutils.code.isOctalDigit(ch)) {
                        number += advance();
                        while (index < length) {
                            ch = source.charCodeAt(index);
                            if (!esutils.code.isOctalDigit(ch)) {
                                break;
                            }
                            number += advance();
                        }

                        if (index < length) {
                            ch = source.charCodeAt(index);
                            if (esutils.code.isIdentifierStart(ch) || esutils.code.isDecimalDigit(ch)) {
                                throwError('unexpected token');
                            }
                        }
                        value = parseInt(number, 8);
                        return Token.NUMBER;
                    }

                    if (esutils.code.isDecimalDigit(ch)) {
                        throwError('unexpected token');
                    }
                }

                while (index < length) {
                    ch = source.charCodeAt(index);
                    if (!esutils.code.isDecimalDigit(ch)) {
                        break;
                    }
                    number += advance();
                }
            }

            if (ch === 0x2E  /* '.' */) {
                number += advance();
                while (index < length) {
                    ch = source.charCodeAt(index);
                    if (!esutils.code.isDecimalDigit(ch)) {
                        break;
                    }
                    number += advance();
                }
            }

            if (ch === 0x65  /* 'e' */ || ch === 0x45  /* 'E' */) {
                number += advance();

                ch = source.charCodeAt(index);
                if (ch === 0x2B  /* '+' */ || ch === 0x2D  /* '-' */) {
                    number += advance();
                }

                ch = source.charCodeAt(index);
                if (esutils.code.isDecimalDigit(ch)) {
                    number += advance();
                    while (index < length) {
                        ch = source.charCodeAt(index);
                        if (!esutils.code.isDecimalDigit(ch)) {
                            break;
                        }
                        number += advance();
                    }
                } else {
                    throwError('unexpected token');
                }
            }

            if (index < length) {
                ch = source.charCodeAt(index);
                if (esutils.code.isIdentifierStart(ch)) {
                    throwError('unexpected token');
                }
            }

            value = parseFloat(number);
            return Token.NUMBER;
        }


        function scanTypeName() {
            var ch, ch2;

            value = advance();
            while (index < length && isTypeName(source.charCodeAt(index))) {
                ch = source.charCodeAt(index);
                if (ch === 0x2E  /* '.' */) {
                    if ((index + 1) >= length) {
                        return Token.ILLEGAL;
                    }
                    ch2 = source.charCodeAt(index + 1);
                    if (ch2 === 0x3C  /* '<' */) {
                        break;
                    }
                }
                value += advance();
            }
            return Token.NAME;
        }

        function next() {
            var ch;

            previous = index;

            while (index < length && esutils.code.isWhiteSpace(source.charCodeAt(index))) {
                advance();
            }
            if (index >= length) {
                token = Token.EOF;
                return token;
            }

            ch = source.charCodeAt(index);
            switch (ch) {
            case 0x27:  /* ''' */
            case 0x22:  /* '"' */
                token = scanString();
                return token;

            case 0x3A:  /* ':' */
                advance();
                token = Token.COLON;
                return token;

            case 0x2C:  /* ',' */
                advance();
                token = Token.COMMA;
                return token;

            case 0x28:  /* '(' */
                advance();
                token = Token.LPAREN;
                return token;

            case 0x29:  /* ')' */
                advance();
                token = Token.RPAREN;
                return token;

            case 0x5B:  /* '[' */
                advance();
                token = Token.LBRACK;
                return token;

            case 0x5D:  /* ']' */
                advance();
                token = Token.RBRACK;
                return token;

            case 0x7B:  /* '{' */
                advance();
                token = Token.LBRACE;
                return token;

            case 0x7D:  /* '}' */
                advance();
                token = Token.RBRACE;
                return token;

            case 0x2E:  /* '.' */
                if (index + 1 < length) {
                    ch = source.charCodeAt(index + 1);
                    if (ch === 0x3C  /* '<' */) {
                        advance();  // '.'
                        advance();  // '<'
                        token = Token.DOT_LT;
                        return token;
                    }

                    if (ch === 0x2E  /* '.' */ && index + 2 < length && source.charCodeAt(index + 2) === 0x2E  /* '.' */) {
                        advance();  // '.'
                        advance();  // '.'
                        advance();  // '.'
                        token = Token.REST;
                        return token;
                    }

                    if (esutils.code.isDecimalDigit(ch)) {
                        token = scanNumber();
                        return token;
                    }
                }
                token = Token.ILLEGAL;
                return token;

            case 0x3C:  /* '<' */
                advance();
                token = Token.LT;
                return token;

            case 0x3E:  /* '>' */
                advance();
                token = Token.GT;
                return token;

            case 0x2A:  /* '*' */
                advance();
                token = Token.STAR;
                return token;

            case 0x7C:  /* '|' */
                advance();
                token = Token.PIPE;
                return token;

            case 0x3F:  /* '?' */
                advance();
                token = Token.QUESTION;
                return token;

            case 0x21:  /* '!' */
                advance();
                token = Token.BANG;
                return token;

            case 0x3D:  /* '=' */
                advance();
                token = Token.EQUAL;
                return token;

            default:
                if (esutils.code.isDecimalDigit(ch)) {
                    token = scanNumber();
                    return token;
                }

                // type string permits following case,
                //
                // namespace.module.MyClass
                //
                // this reduced 1 token TK_NAME
                assert(isTypeName(ch));
                token = scanTypeName();
                return token;
            }
        }

        function consume(target, text) {
            assert(token === target, text || 'consumed token not matched');
            next();
        }

        function expect(target) {
            if (token !== target) {
                throwError('unexpected token');
            }
            next();
        }

        // UnionType := '(' TypeUnionList ')'
        //
        // TypeUnionList :=
        //     <<empty>>
        //   | NonemptyTypeUnionList
        //
        // NonemptyTypeUnionList :=
        //     TypeExpression
        //   | TypeExpression '|' NonemptyTypeUnionList
        function parseUnionType() {
            var elements;
            consume(Token.LPAREN, 'UnionType should start with (');
            elements = [];
            if (token !== Token.RPAREN) {
                while (true) {
                    elements.push(parseTypeExpression());
                    if (token === Token.RPAREN) {
                        break;
                    }
                    expect(Token.PIPE);
                }
            }
            consume(Token.RPAREN, 'UnionType should end with )');
            return {
                type: Syntax.UnionType,
                elements: elements
            };
        }

        // ArrayType := '[' ElementTypeList ']'
        //
        // ElementTypeList :=
        //     <<empty>>
        //  | TypeExpression
        //  | '...' TypeExpression
        //  | TypeExpression ',' ElementTypeList
        function parseArrayType() {
            var elements;
            consume(Token.LBRACK, 'ArrayType should start with [');
            elements = [];
            while (token !== Token.RBRACK) {
                if (token === Token.REST) {
                    consume(Token.REST);
                    elements.push({
                        type: Syntax.RestType,
                        expression: parseTypeExpression()
                    });
                    break;
                } else {
                    elements.push(parseTypeExpression());
                }
                if (token !== Token.RBRACK) {
                    expect(Token.COMMA);
                }
            }
            expect(Token.RBRACK);
            return {
                type: Syntax.ArrayType,
                elements: elements
            };
        }

        function parseFieldName() {
            var v = value;
            if (token === Token.NAME || token === Token.STRING) {
                next();
                return v;
            }

            if (token === Token.NUMBER) {
                consume(Token.NUMBER);
                return String(v);
            }

            throwError('unexpected token');
        }

        // FieldType :=
        //     FieldName
        //   | FieldName ':' TypeExpression
        //
        // FieldName :=
        //     NameExpression
        //   | StringLiteral
        //   | NumberLiteral
        //   | ReservedIdentifier
        function parseFieldType() {
            var key;

            key = parseFieldName();
            if (token === Token.COLON) {
                consume(Token.COLON);
                return {
                    type: Syntax.FieldType,
                    key: key,
                    value: parseTypeExpression()
                };
            }
            return {
                type: Syntax.FieldType,
                key: key,
                value: null
            };
        }

        // RecordType := '{' FieldTypeList '}'
        //
        // FieldTypeList :=
        //     <<empty>>
        //   | FieldType
        //   | FieldType ',' FieldTypeList
        function parseRecordType() {
            var fields;

            consume(Token.LBRACE, 'RecordType should start with {');
            fields = [];
            if (token === Token.COMMA) {
                consume(Token.COMMA);
            } else {
                while (token !== Token.RBRACE) {
                    fields.push(parseFieldType());
                    if (token !== Token.RBRACE) {
                        expect(Token.COMMA);
                    }
                }
            }
            expect(Token.RBRACE);
            return {
                type: Syntax.RecordType,
                fields: fields
            };
        }

        function parseNameExpression() {
            var name = value;
            expect(Token.NAME);
            return {
                type: Syntax.NameExpression,
                name: name
            };
        }

        // TypeExpressionList :=
        //     TopLevelTypeExpression
        //   | TopLevelTypeExpression ',' TypeExpressionList
        function parseTypeExpressionList() {
            var elements = [];

            elements.push(parseTop());
            while (token === Token.COMMA) {
                consume(Token.COMMA);
                elements.push(parseTop());
            }
            return elements;
        }

        // TypeName :=
        //     NameExpression
        //   | NameExpression TypeApplication
        //
        // TypeApplication :=
        //     '.<' TypeExpressionList '>'
        //   | '<' TypeExpressionList '>'   // this is extension of doctrine
        function parseTypeName() {
            var expr, applications;

            expr = parseNameExpression();
            if (token === Token.DOT_LT || token === Token.LT) {
                next();
                applications = parseTypeExpressionList();
                expect(Token.GT);
                return {
                    type: Syntax.TypeApplication,
                    expression: expr,
                    applications: applications
                };
            }
            return expr;
        }

        // ResultType :=
        //     <<empty>>
        //   | ':' void
        //   | ':' TypeExpression
        //
        // BNF is above
        // but, we remove <<empty>> pattern, so token is always TypeToken::COLON
        function parseResultType() {
            consume(Token.COLON, 'ResultType should start with :');
            if (token === Token.NAME && value === 'void') {
                consume(Token.NAME);
                return {
                    type: Syntax.VoidLiteral
                };
            }
            return parseTypeExpression();
        }

        // ParametersType :=
        //     RestParameterType
        //   | NonRestParametersType
        //   | NonRestParametersType ',' RestParameterType
        //
        // RestParameterType :=
        //     '...'
        //     '...' Identifier
        //
        // NonRestParametersType :=
        //     ParameterType ',' NonRestParametersType
        //   | ParameterType
        //   | OptionalParametersType
        //
        // OptionalParametersType :=
        //     OptionalParameterType
        //   | OptionalParameterType, OptionalParametersType
        //
        // OptionalParameterType := ParameterType=
        //
        // ParameterType := TypeExpression | Identifier ':' TypeExpression
        //
        // Identifier is "new" or "this"
        function parseParametersType() {
            var params = [], optionalSequence = false, expr, rest = false;

            while (token !== Token.RPAREN) {
                if (token === Token.REST) {
                    // RestParameterType
                    consume(Token.REST);
                    rest = true;
                }

                expr = parseTypeExpression();
                if (expr.type === Syntax.NameExpression && token === Token.COLON) {
                    // Identifier ':' TypeExpression
                    consume(Token.COLON);
                    expr = {
                        type: Syntax.ParameterType,
                        name: expr.name,
                        expression: parseTypeExpression()
                    };
                }
                if (token === Token.EQUAL) {
                    consume(Token.EQUAL);
                    expr = {
                        type: Syntax.OptionalType,
                        expression: expr
                    };
                    optionalSequence = true;
                } else {
                    if (optionalSequence) {
                        throwError('unexpected token');
                    }
                }
                if (rest) {
                    expr = {
                        type: Syntax.RestType,
                        expression: expr
                    };
                }
                params.push(expr);
                if (token !== Token.RPAREN) {
                    expect(Token.COMMA);
                }
            }
            return params;
        }

        // FunctionType := 'function' FunctionSignatureType
        //
        // FunctionSignatureType :=
        //   | TypeParameters '(' ')' ResultType
        //   | TypeParameters '(' ParametersType ')' ResultType
        //   | TypeParameters '(' 'this' ':' TypeName ')' ResultType
        //   | TypeParameters '(' 'this' ':' TypeName ',' ParametersType ')' ResultType
        function parseFunctionType() {
            var isNew, thisBinding, params, result, fnType;
            assert(token === Token.NAME && value === 'function', 'FunctionType should start with \'function\'');
            consume(Token.NAME);

            // Google Closure Compiler is not implementing TypeParameters.
            // So we do not. if we don't get '(', we see it as error.
            expect(Token.LPAREN);

            isNew = false;
            params = [];
            thisBinding = null;
            if (token !== Token.RPAREN) {
                // ParametersType or 'this'
                if (token === Token.NAME &&
                        (value === 'this' || value === 'new')) {
                    // 'this' or 'new'
                    // 'new' is Closure Compiler extension
                    isNew = value === 'new';
                    consume(Token.NAME);
                    expect(Token.COLON);
                    thisBinding = parseTypeName();
                    if (token === Token.COMMA) {
                        consume(Token.COMMA);
                        params = parseParametersType();
                    }
                } else {
                    params = parseParametersType();
                }
            }

            expect(Token.RPAREN);

            result = null;
            if (token === Token.COLON) {
                result = parseResultType();
            }

            fnType = {
                type: Syntax.FunctionType,
                params: params,
                result: result
            };
            if (thisBinding) {
                // avoid adding null 'new' and 'this' properties
                fnType['this'] = thisBinding;
                if (isNew) {
                    fnType['new'] = true;
                }
            }
            return fnType;
        }

        // BasicTypeExpression :=
        //     '*'
        //   | 'null'
        //   | 'undefined'
        //   | TypeName
        //   | FunctionType
        //   | UnionType
        //   | RecordType
        //   | ArrayType
        function parseBasicTypeExpression() {
            var context;
            switch (token) {
            case Token.STAR:
                consume(Token.STAR);
                return {
                    type: Syntax.AllLiteral
                };

            case Token.LPAREN:
                return parseUnionType();

            case Token.LBRACK:
                return parseArrayType();

            case Token.LBRACE:
                return parseRecordType();

            case Token.NAME:
                if (value === 'null') {
                    consume(Token.NAME);
                    return {
                        type: Syntax.NullLiteral
                    };
                }

                if (value === 'undefined') {
                    consume(Token.NAME);
                    return {
                        type: Syntax.UndefinedLiteral
                    };
                }

                context = Context.save();
                if (value === 'function') {
                    try {
                        return parseFunctionType();
                    } catch (e) {
                        context.restore();
                    }
                }

                return parseTypeName();

            default:
                throwError('unexpected token');
            }
        }

        // TypeExpression :=
        //     BasicTypeExpression
        //   | '?' BasicTypeExpression
        //   | '!' BasicTypeExpression
        //   | BasicTypeExpression '?'
        //   | BasicTypeExpression '!'
        //   | '?'
        //   | BasicTypeExpression '[]'
        function parseTypeExpression() {
            var expr;

            if (token === Token.QUESTION) {
                consume(Token.QUESTION);
                if (token === Token.COMMA || token === Token.EQUAL || token === Token.RBRACE ||
                        token === Token.RPAREN || token === Token.PIPE || token === Token.EOF ||
                        token === Token.RBRACK) {
                    return {
                        type: Syntax.NullableLiteral
                    };
                }
                return {
                    type: Syntax.NullableType,
                    expression: parseBasicTypeExpression(),
                    prefix: true
                };
            }

            if (token === Token.BANG) {
                consume(Token.BANG);
                return {
                    type: Syntax.NonNullableType,
                    expression: parseBasicTypeExpression(),
                    prefix: true
                };
            }

            expr = parseBasicTypeExpression();
            if (token === Token.BANG) {
                consume(Token.BANG);
                return {
                    type: Syntax.NonNullableType,
                    expression: expr,
                    prefix: false
                };
            }

            if (token === Token.QUESTION) {
                consume(Token.QUESTION);
                return {
                    type: Syntax.NullableType,
                    expression: expr,
                    prefix: false
                };
            }

            if (token === Token.LBRACK) {
                consume(Token.LBRACK);
                consume(Token.RBRACK, 'expected an array-style type declaration (' + value + '[])');
                return {
                    type: Syntax.TypeApplication,
                    expression: {
                        type: Syntax.NameExpression,
                        name: 'Array'
                    },
                    applications: [expr]
                };
            }

            return expr;
        }

        // TopLevelTypeExpression :=
        //      TypeExpression
        //    | TypeUnionList
        //
        // This rule is Google Closure Compiler extension, not ES4
        // like,
        //   { number | string }
        // If strict to ES4, we should write it as
        //   { (number|string) }
        function parseTop() {
            var expr, elements;

            expr = parseTypeExpression();
            if (token !== Token.PIPE) {
                return expr;
            }

            elements = [ expr ];
            consume(Token.PIPE);
            while (true) {
                elements.push(parseTypeExpression());
                if (token !== Token.PIPE) {
                    break;
                }
                consume(Token.PIPE);
            }

            return {
                type: Syntax.UnionType,
                elements: elements
            };
        }

        function parseTopParamType() {
            var expr;

            if (token === Token.REST) {
                consume(Token.REST);
                return {
                    type: Syntax.RestType,
                    expression: parseTop()
                };
            }

            expr = parseTop();
            if (token === Token.EQUAL) {
                consume(Token.EQUAL);
                return {
                    type: Syntax.OptionalType,
                    expression: expr
                };
            }

            return expr;
        }

        function parseType(src, opt) {
            var expr;

            source = src;
            length = source.length;
            index = 0;
            previous = 0;

            next();
            expr = parseTop();

            if (opt && opt.midstream) {
                return {
                    expression: expr,
                    index: previous
                };
            }

            if (token !== Token.EOF) {
                throwError('not reach to EOF');
            }

            return expr;
        }

        function parseParamType(src, opt) {
            var expr;

            source = src;
            length = source.length;
            index = 0;
            previous = 0;

            next();
            expr = parseTopParamType();

            if (opt && opt.midstream) {
                return {
                    expression: expr,
                    index: previous
                };
            }

            if (token !== Token.EOF) {
                throwError('not reach to EOF');
            }

            return expr;
        }

        function stringifyImpl(node, compact, topLevel) {
            var result, i, iz;

            switch (node.type) {
            case Syntax.NullableLiteral:
                result = '?';
                break;

            case Syntax.AllLiteral:
                result = '*';
                break;

            case Syntax.NullLiteral:
                result = 'null';
                break;

            case Syntax.UndefinedLiteral:
                result = 'undefined';
                break;

            case Syntax.VoidLiteral:
                result = 'void';
                break;

            case Syntax.UnionType:
                if (!topLevel) {
                    result = '(';
                } else {
                    result = '';
                }

                for (i = 0, iz = node.elements.length; i < iz; ++i) {
                    result += stringifyImpl(node.elements[i], compact);
                    if ((i + 1) !== iz) {
                        result += '|';
                    }
                }

                if (!topLevel) {
                    result += ')';
                }
                break;

            case Syntax.ArrayType:
                result = '[';
                for (i = 0, iz = node.elements.length; i < iz; ++i) {
                    result += stringifyImpl(node.elements[i], compact);
                    if ((i + 1) !== iz) {
                        result += compact ? ',' : ', ';
                    }
                }
                result += ']';
                break;

            case Syntax.RecordType:
                result = '{';
                for (i = 0, iz = node.fields.length; i < iz; ++i) {
                    result += stringifyImpl(node.fields[i], compact);
                    if ((i + 1) !== iz) {
                        result += compact ? ',' : ', ';
                    }
                }
                result += '}';
                break;

            case Syntax.FieldType:
                if (node.value) {
                    result = node.key + (compact ? ':' : ': ') + stringifyImpl(node.value, compact);
                } else {
                    result = node.key;
                }
                break;

            case Syntax.FunctionType:
                result = compact ? 'function(' : 'function (';

                if (node['this']) {
                    if (node['new']) {
                        result += (compact ? 'new:' : 'new: ');
                    } else {
                        result += (compact ? 'this:' : 'this: ');
                    }

                    result += stringifyImpl(node['this'], compact);

                    if (node.params.length !== 0) {
                        result += compact ? ',' : ', ';
                    }
                }

                for (i = 0, iz = node.params.length; i < iz; ++i) {
                    result += stringifyImpl(node.params[i], compact);
                    if ((i + 1) !== iz) {
                        result += compact ? ',' : ', ';
                    }
                }

                result += ')';

                if (node.result) {
                    result += (compact ? ':' : ': ') + stringifyImpl(node.result, compact);
                }
                break;

            case Syntax.ParameterType:
                result = node.name + (compact ? ':' : ': ') + stringifyImpl(node.expression, compact);
                break;

            case Syntax.RestType:
                result = '...';
                if (node.expression) {
                    result += stringifyImpl(node.expression, compact);
                }
                break;

            case Syntax.NonNullableType:
                if (node.prefix) {
                    result = '!' + stringifyImpl(node.expression, compact);
                } else {
                    result = stringifyImpl(node.expression, compact) + '!';
                }
                break;

            case Syntax.OptionalType:
                result = stringifyImpl(node.expression, compact) + '=';
                break;

            case Syntax.NullableType:
                if (node.prefix) {
                    result = '?' + stringifyImpl(node.expression, compact);
                } else {
                    result = stringifyImpl(node.expression, compact) + '?';
                }
                break;

            case Syntax.NameExpression:
                result = node.name;
                break;

            case Syntax.TypeApplication:
                result = stringifyImpl(node.expression, compact) + '.<';
                for (i = 0, iz = node.applications.length; i < iz; ++i) {
                    result += stringifyImpl(node.applications[i], compact);
                    if ((i + 1) !== iz) {
                        result += compact ? ',' : ', ';
                    }
                }
                result += '>';
                break;

            default:
                throwError('Unknown type ' + node.type);
            }

            return result;
        }

        function stringify(node, options) {
            if (options == null) {
                options = {};
            }
            return stringifyImpl(node, options.compact, options.topLevel);
        }

        exports.parseType = parseType;
        exports.parseParamType = parseParamType;
        exports.stringify = stringify;
        exports.Syntax = Syntax;
    }(typed = {}));

    // JSDoc Tag Parser

    (function (exports) {
        var Rules,
            index,
            lineNumber,
            length,
            source,
            recoverable,
            sloppy,
            strict;

        function advance() {
            var ch = source.charCodeAt(index);
            index += 1;
            if (esutils.code.isLineTerminator(ch) && !(ch === 0x0D  /* '\r' */ && source.charCodeAt(index) === 0x0A  /* '\n' */)) {
                lineNumber += 1;
            }
            return String.fromCharCode(ch);
        }

        function scanTitle() {
            var title = '';
            // waste '@'
            advance();

            while (index < length && isASCIIAlphanumeric(source.charCodeAt(index))) {
                title += advance();
            }

            return title;
        }

        function seekContent() {
            var ch, waiting, last = index;

            waiting = false;
            while (last < length) {
                ch = source.charCodeAt(last);
                if (esutils.code.isLineTerminator(ch) && !(ch === 0x0D  /* '\r' */ && source.charCodeAt(last + 1) === 0x0A  /* '\n' */)) {
                    lineNumber += 1;
                    waiting = true;
                } else if (waiting) {
                    if (ch === 0x40  /* '@' */) {
                        break;
                    }
                    if (!esutils.code.isWhiteSpace(ch)) {
                        waiting = false;
                    }
                }
                last += 1;
            }
            return last;
        }

        // type expression may have nest brace, such as,
        // { { ok: string } }
        //
        // therefore, scanning type expression with balancing braces.
        function parseType(title, last) {
            var ch, brace, type, direct = false;


            // search '{'
            while (index < last) {
                ch = source.charCodeAt(index);
                if (esutils.code.isWhiteSpace(ch)) {
                    advance();
                } else if (ch === 0x7B  /* '{' */) {
                    advance();
                    break;
                } else {
                    // this is direct pattern
                    direct = true;
                    break;
                }
            }


            if (direct) {
                return null;
            }

            // type expression { is found
            brace = 1;
            type = '';
            while (index < last) {
                ch = source.charCodeAt(index);
                if (esutils.code.isLineTerminator(ch)) {
                    advance();
                } else {
                    if (ch === 0x7D  /* '}' */) {
                        brace -= 1;
                        if (brace === 0) {
                            advance();
                            break;
                        }
                    } else if (ch === 0x7B  /* '{' */) {
                        brace += 1;
                    }
                    type += advance();
                }
            }

            if (brace !== 0) {
                // braces is not balanced
                return throwError('Braces are not balanced');
            }

            if (isParamTitle(title)) {
                return typed.parseParamType(type);
            }
            return typed.parseType(type);
        }

        function scanIdentifier(last) {
            var identifier;
            if (!esutils.code.isIdentifierStart(source.charCodeAt(index))) {
                return null;
            }
            identifier = advance();
            while (index < last && esutils.code.isIdentifierPart(source.charCodeAt(index))) {
                identifier += advance();
            }
            return identifier;
        }

        function skipWhiteSpace(last) {
            while (index < last && (esutils.code.isWhiteSpace(source.charCodeAt(index)) || esutils.code.isLineTerminator(source.charCodeAt(index)))) {
                advance();
            }
        }

        function parseName(last, allowBrackets, allowNestedParams) {
            var name = '', useBrackets;

            skipWhiteSpace(last);

            if (index >= last) {
                return null;
            }

            if (allowBrackets && source.charCodeAt(index) === 0x5B  /* '[' */) {
                useBrackets = true;
                name = advance();
            }

            if (!esutils.code.isIdentifierStart(source.charCodeAt(index))) {
                return null;
            }

            name += scanIdentifier(last);

            if (allowNestedParams) {
                while (source.charCodeAt(index) === 0x2E  /* '.' */ ||
                        source.charCodeAt(index) === 0x23  /* '#' */ ||
                        source.charCodeAt(index) === 0x7E  /* '~' */) {
                    name += advance();
                    name += scanIdentifier(last);
                }
            }

            if (useBrackets) {
                // do we have a default value for this?
                if (source.charCodeAt(index) === 0x3D  /* '=' */) {

                    // consume the '='' symbol
                    name += advance();
                    // scan in the default value
                    while (index < last && source.charCodeAt(index) !== 0x5D  /* ']' */) {
                        name += advance();
                    }
                }

                if (index >= last  || source.charCodeAt(index) !== 0x5D  /* ']' */) {
                    // we never found a closing ']'
                    return null;
                }

                // collect the last ']'
                name += advance();
            }

            return name;
        }

        function skipToTag() {
            while (index < length && source.charCodeAt(index) !== 0x40  /* '@' */) {
                advance();
            }
            if (index >= length) {
                return false;
            }
            assert(source.charCodeAt(index) === 0x40  /* '@' */);
            return true;
        }

        function TagParser(options, title) {
            this._options = options;
            this._title = title;
            this._tag = {
                title: title,
                description: null
            };
            if (this._options.lineNumbers) {
                this._tag.lineNumber = lineNumber;
            }
            this._last = 0;
            // space to save special information for title parsers.
            this._extra = { };
        }

        // addError(err, ...)
        TagParser.prototype.addError = function addError(errorText) {
            var args = Array.prototype.slice.call(arguments, 1),
                msg = errorText.replace(
                    /%(\d)/g,
                    function (whole, index) {
                        assert(index < args.length, 'Message reference must be in range');
                        return args[index];
                    }
                );

            if (!this._tag.errors) {
                this._tag.errors = [];
            }
            if (strict) {
                throwError(msg);
            }
            this._tag.errors.push(msg);
            return recoverable;
        };

        TagParser.prototype.parseType = function () {
            // type required titles
            if (isTypeParameterRequired(this._title)) {
                try {
                    this._tag.type = parseType(this._title, this._last);
                    if (!this._tag.type) {
                        if (!isParamTitle(this._title)) {
                            if (!this.addError('Missing or invalid tag type')) {
                                return false;
                            }
                        }
                    }
                } catch (error) {
                    this._tag.type = null;
                    if (!this.addError(error.message)) {
                        return false;
                    }
                }
            } else if (isAllowedType(this._title)) {
                // optional types
                try {
                    this._tag.type = parseType(this._title, this._last);
                } catch (e) {
                    //For optional types, lets drop the thrown error when we hit the end of the file
                }
            }
            return true;
        };

        TagParser.prototype._parseNamePath = function (optional) {
            var name;
            name = parseName(this._last, sloppy && isParamTitle(this._title), true);
            if (!name) {
                if (!optional) {
                    if (!this.addError('Missing or invalid tag name')) {
                        return false;
                    }
                }
            }
            this._tag.name = name;
            return true;
        };

        TagParser.prototype.parseNamePath = function () {
            return this._parseNamePath(false);
        };

        TagParser.prototype.parseNamePathOptional = function () {
            return this._parseNamePath(true);
        };


        TagParser.prototype.parseName = function () {
            var assign, name;

            // param, property requires name
            if (isAllowedName(this._title)) {
                this._tag.name = parseName(this._last, sloppy && isParamTitle(this._title), isAllowedNested(this._title));
                if (!this._tag.name) {
                    if (!isNameParameterRequired(this._title)) {
                        return true;
                    }

                    // it's possible the name has already been parsed but interpreted as a type
                    // it's also possible this is a sloppy declaration, in which case it will be
                    // fixed at the end
                    if (isParamTitle(this._title) && this._tag.type && this._tag.type.name) {
                        this._extra.name = this._tag.type;
                        this._tag.name = this._tag.type.name;
                        this._tag.type = null;
                    } else {
                        if (!this.addError('Missing or invalid tag name')) {
                            return false;
                        }
                    }
                } else {
                    name = this._tag.name;
                    if (name.charAt(0) === '[' && name.charAt(name.length - 1) === ']') {
                        // extract the default value if there is one
                        // example: @param {string} [somebody=John Doe] description
                        assign = name.substring(1, name.length - 1).split('=');
                        if (assign[1]) {
                            this._tag['default'] = assign[1];
                        }
                        this._tag.name = assign[0];

                        // convert to an optional type
                        if (this._tag.type && this._tag.type.type !== 'OptionalType') {
                            this._tag.type = {
                                type: 'OptionalType',
                                expression: this._tag.type
                            };
                        }
                    }
                }
            }

            return true;
        };

        TagParser.prototype.parseDescription = function parseDescription() {
            var description = trim(sliceSource(source, index, this._last));
            if (description) {
                if ((/^-\s+/).test(description)) {
                    description = description.substring(2);
                }
                this._tag.description = description;
            }
            return true;
        };

        TagParser.prototype.parseKind = function parseKind() {
            var kind, kinds;
            kinds = {
                'class': true,
                'constant': true,
                'event': true,
                'external': true,
                'file': true,
                'function': true,
                'member': true,
                'mixin': true,
                'module': true,
                'namespace': true,
                'typedef': true
            };
            kind = trim(sliceSource(source, index, this._last));
            this._tag.kind = kind;
            if (!hasOwnProperty(kinds, kind)) {
                if (!this.addError('Invalid kind name \'%0\'', kind)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.parseAccess = function parseAccess() {
            var access;
            access = trim(sliceSource(source, index, this._last));
            this._tag.access = access;
            if (access !== 'private' && access !== 'protected' && access !== 'public') {
                if (!this.addError('Invalid access name \'%0\'', access)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.parseVariation = function parseVariation() {
            var variation, text;
            text = trim(sliceSource(source, index, this._last));
            variation = parseFloat(text, 10);
            this._tag.variation = variation;
            if (isNaN(variation)) {
                if (!this.addError('Invalid variation \'%0\'', text)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.ensureEnd = function () {
            var shouldBeEmpty = trim(sliceSource(source, index, this._last));
            if (shouldBeEmpty) {
                if (!this.addError('Unknown content \'%0\'', shouldBeEmpty)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.epilogue = function epilogue() {
            var description;

            description = this._tag.description;
            // un-fix potentially sloppy declaration
            if (isParamTitle(this._title) && !this._tag.type && description && description.charAt(0) === '[') {
                this._tag.type = this._extra.name;
                this._tag.name = undefined;

                if (!sloppy) {
                    if (!this.addError('Missing or invalid tag name')) {
                        return false;
                    }
                }
            }

            return true;
        };

        Rules = {
            // http://usejsdoc.org/tags-access.html
            'access': ['parseAccess'],
            // http://usejsdoc.org/tags-alias.html
            'alias': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-augments.html
            'augments': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-constructor.html
            'constructor': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-constructor.html
            'class': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-extends.html
            'extends': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-deprecated.html
            'deprecated': ['parseDescription'],
            // http://usejsdoc.org/tags-global.html
            'global': ['ensureEnd'],
            // http://usejsdoc.org/tags-inner.html
            'inner': ['ensureEnd'],
            // http://usejsdoc.org/tags-instance.html
            'instance': ['ensureEnd'],
            // http://usejsdoc.org/tags-kind.html
            'kind': ['parseKind'],
            // http://usejsdoc.org/tags-mixes.html
            'mixes': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-mixin.html
            'mixin': ['parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-member.html
            'member': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-method.html
            'method': ['parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-module.html
            'module': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-method.html
            'func': ['parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-method.html
            'function': ['parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-member.html
            'var': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-name.html
            'name': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-namespace.html
            'namespace': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-private.html
            'private': ['parseType', 'parseDescription'],
            // http://usejsdoc.org/tags-protected.html
            'protected': ['parseType', 'parseDescription'],
            // http://usejsdoc.org/tags-public.html
            'public': ['parseType', 'parseDescription'],
            // http://usejsdoc.org/tags-readonly.html
            'readonly': ['ensureEnd'],
            // http://usejsdoc.org/tags-requires.html
            'requires': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-since.html
            'since': ['parseDescription'],
            // http://usejsdoc.org/tags-static.html
            'static': ['ensureEnd'],
            // http://usejsdoc.org/tags-summary.html
            'summary': ['parseDescription'],
            // http://usejsdoc.org/tags-this.html
            'this': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-todo.html
            'todo': ['parseDescription'],
            // http://usejsdoc.org/tags-variation.html
            'variation': ['parseVariation'],
            // http://usejsdoc.org/tags-version.html
            'version': ['parseDescription']
        };

        TagParser.prototype.parse = function parse() {
            var i, iz, sequences, method;

            // empty title
            if (!this._title) {
                if (!this.addError('Missing or invalid title')) {
                    return null;
                }
            }

            // Seek to content last index.
            this._last = seekContent(this._title);

            if (hasOwnProperty(Rules, this._title)) {
                sequences = Rules[this._title];
            } else {
                // default sequences
                sequences = ['parseType', 'parseName', 'parseDescription', 'epilogue'];
            }

            for (i = 0, iz = sequences.length; i < iz; ++i) {
                method = sequences[i];
                if (!this[method]()) {
                    return null;
                }
            }

            // Seek global index to end of this tag.
            index = this._last;
            return this._tag;
        };

        function parseTag(options) {
            var title, parser;

            // skip to tag
            if (!skipToTag()) {
                return null;
            }

            // scan title
            title = scanTitle();

            // construct tag parser
            parser = new TagParser(options, title);
            return parser.parse();
        }

        //
        // Parse JSDoc
        //

        function scanJSDocDescription() {
            var description = '', ch, atAllowed;

            atAllowed = true;
            while (index < length) {
                ch = source.charCodeAt(index);

                if (atAllowed && ch === 0x40  /* '@' */) {
                    break;
                }

                if (esutils.code.isLineTerminator(ch)) {
                    atAllowed = true;
                } else if (atAllowed && !esutils.code.isWhiteSpace(ch)) {
                    atAllowed = false;
                }

                description += advance();
            }
            return trim(description);
        }

        function parse(comment, options) {
            var tags = [], tag, description, interestingTags, i, iz;

            if (options === undefined) {
                options = {};
            }

            if (typeof options.unwrap === 'boolean' && options.unwrap) {
                source = unwrapComment(comment);
            } else {
                source = comment;
            }

            // array of relevant tags
            if (options.tags) {
                if (isArray(options.tags)) {
                    interestingTags = { };
                    for (i = 0, iz = options.tags.length; i < iz; i++) {
                        if (typeof options.tags[i] === 'string') {
                            interestingTags[options.tags[i]] = true;
                        } else {
                            throwError('Invalid "tags" parameter: ' + options.tags);
                        }
                    }
                } else {
                    throwError('Invalid "tags" parameter: ' + options.tags);
                }
            }

            length = source.length;
            index = 0;
            lineNumber = 0;
            recoverable = options.recoverable;
            sloppy = options.sloppy;
            strict = options.strict;

            description = scanJSDocDescription();

            while (true) {
                tag = parseTag(options);
                if (!tag) {
                    break;
                }
                if (!interestingTags || interestingTags.hasOwnProperty(tag.title)) {
                    tags.push(tag);
                }
            }

            return {
                description: description,
                tags: tags
            };
        }
        exports.parse = parse;
    }(jsdoc = {}));

    exports.version = VERSION;
    exports.parse = jsdoc.parse;
    exports.parseType = typed.parseType;
    exports.parseParamType = typed.parseParamType;
    exports.unwrapComment = unwrapComment;
    exports.Syntax = shallowCopy(typed.Syntax);
    exports.Error = DoctrineError;
    exports.type = {
        Syntax: exports.Syntax,
        parseType: typed.parseType,
        parseParamType: typed.parseParamType,
        stringify: typed.stringify
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./package.json":13,"esutils":12}],9:[function(require,module,exports){
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    function isExpression(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'ArrayExpression':
            case 'AssignmentExpression':
            case 'BinaryExpression':
            case 'CallExpression':
            case 'ConditionalExpression':
            case 'FunctionExpression':
            case 'Identifier':
            case 'Literal':
            case 'LogicalExpression':
            case 'MemberExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'SequenceExpression':
            case 'ThisExpression':
            case 'UnaryExpression':
            case 'UpdateExpression':
                return true;
        }
        return false;
    }

    function isIterationStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'DoWhileStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'WhileStatement':
                return true;
        }
        return false;
    }

    function isStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'BlockStatement':
            case 'BreakStatement':
            case 'ContinueStatement':
            case 'DebuggerStatement':
            case 'DoWhileStatement':
            case 'EmptyStatement':
            case 'ExpressionStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'IfStatement':
            case 'LabeledStatement':
            case 'ReturnStatement':
            case 'SwitchStatement':
            case 'ThrowStatement':
            case 'TryStatement':
            case 'VariableDeclaration':
            case 'WhileStatement':
            case 'WithStatement':
                return true;
        }
        return false;
    }

    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }

    function trailingStatement(node) {
        switch (node.type) {
        case 'IfStatement':
            if (node.alternate != null) {
                return node.alternate;
            }
            return node.consequent;

        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
            return node.body;
        }
        return null;
    }

    function isProblematicIfStatement(node) {
        var current;

        if (node.type !== 'IfStatement') {
            return false;
        }
        if (node.alternate == null) {
            return false;
        }
        current = node.consequent;
        do {
            if (current.type === 'IfStatement') {
                if (current.alternate == null)  {
                    return true;
                }
            }
            current = trailingStatement(current);
        } while (current);

        return false;
    }

    module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,

        trailingStatement: trailingStatement
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{}],10:[function(require,module,exports){
/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var Regex, NON_ASCII_WHITESPACES;

    // See `tools/generate-identifier-regex.js`.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };

    function isDecimalDigit(ch) {
        return (ch >= 48 && ch <= 57);   // 0..9
    }

    function isHexDigit(ch) {
        return isDecimalDigit(ch) ||    // 0..9
            (97 <= ch && ch <= 102) ||  // a..f
            (65 <= ch && ch <= 70);     // A..F
    }

    function isOctalDigit(ch) {
        return (ch >= 48 && ch <= 55);   // 0..7
    }

    // 7.2 White Space

    NON_ASCII_WHITESPACES = [
        0x1680, 0x180E,
        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
        0x202F, 0x205F,
        0x3000,
        0xFEFF
    ];

    function isWhiteSpace(ch) {
        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
            (ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0);
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return (ch >= 97 && ch <= 122) ||     // a..z
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch === 36) || (ch === 95) ||     // $ (dollar) and _ (underscore)
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }

    function isIdentifierPart(ch) {
        return (ch >= 97 && ch <= 122) ||     // a..z
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch >= 48 && ch <= 57) ||         // 0..9
            (ch === 36) || (ch === 95) ||     // $ (dollar) and _ (underscore)
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStart: isIdentifierStart,
        isIdentifierPart: isIdentifierPart
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{}],11:[function(require,module,exports){
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code = require('./code');

    function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    function isReservedWordES5(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }

    function isReservedWordES6(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierName(id) {
        var i, iz, ch;

        if (id.length === 0) {
            return false;
        }

        ch = id.charCodeAt(0);
        if (!code.isIdentifierStart(ch) || ch === 92) {  // \ (backslash)
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPart(ch) || ch === 92) {  // \ (backslash)
                return false;
            }
        }
        return true;
    }

    function isIdentifierES5(id, strict) {
        return isIdentifierName(id) && !isReservedWordES5(id, strict);
    }

    function isIdentifierES6(id, strict) {
        return isIdentifierName(id) && !isReservedWordES6(id, strict);
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierName: isIdentifierName,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./code":10}],12:[function(require,module,exports){
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function () {
    'use strict';

    exports.ast = require('./ast');
    exports.code = require('./code');
    exports.keyword = require('./keyword');
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./ast":9,"./code":10,"./keyword":11}],13:[function(require,module,exports){
module.exports={
  "name": "doctrine",
  "description": "JSDoc parser",
  "homepage": "http://github.com/Constellation/doctrine.html",
  "main": "doctrine.js",
  "version": "0.6.2",
  "engines": {
    "node": ">=0.10.0"
  },
  "maintainers": [
    {
      "name": "constellation",
      "email": "utatane.tea@gmail.com"
    }
  ],
  "repository": {
    "type": "git",
    "url": "http://github.com/Constellation/doctrine.git"
  },
  "devDependencies": {
    "gulp": "^3.8.10",
    "gulp-eslint": "^0.1.8",
    "gulp-istanbul": "^0.3.1",
    "gulp-jshint": "^1.9.0",
    "gulp-mocha": "^1.1.1",
    "jshint-stylish": "^1.0.0",
    "should": "^4.1.0"
  },
  "licenses": [
    {
      "type": "BSD",
      "url": "http://github.com/Constellation/doctrine/raw/master/LICENSE.BSD"
    }
  ],
  "scripts": {
    "test": "gulp",
    "unit-test": "gulp test",
    "lint": "gulp lint"
  },
  "dependencies": {
    "esutils": "^1.1.4"
  },
  "gitHead": "fc47c185f8003e932986460b7f08aa4535ed9a43",
  "bugs": {
    "url": "https://github.com/Constellation/doctrine/issues"
  },
  "_id": "doctrine@0.6.2",
  "_shasum": "a7f3ddbf8ce79d1cd230388ee21035e2fd4ce394",
  "_from": "doctrine@latest",
  "_npmVersion": "2.0.0-alpha-5",
  "_npmUser": {
    "name": "constellation",
    "email": "utatane.tea@gmail.com"
  },
  "dist": {
    "shasum": "a7f3ddbf8ce79d1cd230388ee21035e2fd4ce394",
    "tarball": "http://registry.npmjs.org/doctrine/-/doctrine-0.6.2.tgz"
  },
  "directories": {},
  "_resolved": "https://registry.npmjs.org/doctrine/-/doctrine-0.6.2.tgz",
  "readme": "ERROR: No README data found!"
}

},{}],14:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe,  '\\$&');
};

},{}],15:[function(require,module,exports){
/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2013 Alex Seville <hi@alexanderseville.com>
  Copyright (C) 2014 Thiago de Arruda <tpadilha84@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * Escope (<a href="http://github.com/Constellation/escope">escope</a>) is an <a
 * href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">ECMAScript</a>
 * scope analyzer extracted from the <a
 * href="http://github.com/Constellation/esmangle">esmangle project</a/>.
 * <p>
 * <em>escope</em> finds lexical scopes in a source program, i.e. areas of that
 * program where different occurrences of the same identifier refer to the same
 * variable. With each scope the contained variables are collected, and each
 * identifier reference in code is linked to its corresponding variable (if
 * possible).
 * <p>
 * <em>escope</em> works on a syntax tree of the parsed source code which has
 * to adhere to the <a
 * href="https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API">
 * Mozilla Parser API</a>. E.g. <a href="http://esprima.org">esprima</a> is a parser
 * that produces such syntax trees.
 * <p>
 * The main interface is the {@link analyze} function.
 * @module
 */

/*jslint bitwise:true */
(function () {
    'use strict';

    var Syntax,
        util,
        extend,
        estraverse,
        esrecurse,
        Map,
        WeakMap;

    util = require('util');
    extend = require('util-extend');
    estraverse = require('estraverse');
    esrecurse = require('esrecurse');

    Map = require('es6-map');
    WeakMap = require('es6-weak-map');

    Syntax = estraverse.Syntax;

    function assert(cond, text) {
        if (!cond) {
            throw new Error(text);
        }
    }

    function defaultOptions() {
        return {
            optimistic: false,
            directive: false,
            nodejsScope: false,
            sourceType: 'script',  // one of ['script', 'module']
            ecmaVersion: 5
        };
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    /**
     * A Reference represents a single occurrence of an identifier in code.
     * @class Reference
     */
    function Reference(ident, scope, flag, writeExpr, maybeImplicitGlobal, partial) {
        /**
         * Identifier syntax node.
         * @member {esprima#Identifier} Reference#identifier
         */
        this.identifier = ident;
        /**
         * Reference to the enclosing Scope.
         * @member {Scope} Reference#from
         */
        this.from = scope;
        /**
         * Whether the reference comes from a dynamic scope (such as 'eval',
         * 'with', etc.), and may be trapped by dynamic scopes.
         * @member {boolean} Reference#tainted
         */
        this.tainted = false;
        /**
         * The variable this reference is resolved with.
         * @member {Variable} Reference#resolved
         */
        this.resolved = null;
        /**
         * The read-write mode of the reference. (Value is one of {@link
         * Reference.READ}, {@link Reference.RW}, {@link Reference.WRITE}).
         * @member {number} Reference#flag
         * @private
         */
        this.flag = flag;
        if (this.isWrite()) {
            /**
             * If reference is writeable, this is the tree being written to it.
             * @member {esprima#Node} Reference#writeExpr
             */
            this.writeExpr = writeExpr;
            /**
             * Whether the Reference might refer to a partial value of writeExpr.
             * @member {boolean} Reference#partial
             */
            this.partial = partial;
        }
        this.__maybeImplicitGlobal = maybeImplicitGlobal;
    }

    /**
     * @constant Reference.READ
     * @private
     */
    Reference.READ = 0x1;
    /**
     * @constant Reference.WRITE
     * @private
     */
    Reference.WRITE = 0x2;
    /**
     * @constant Reference.RW
     * @private
     */
    Reference.RW = Reference.READ | Reference.WRITE;

    /**
     * Whether the reference is static.
     * @method Reference#isStatic
     * @return {boolean}
     */
    Reference.prototype.isStatic = function isStatic() {
        return !this.tainted && this.resolved && this.resolved.scope.isStatic();
    };

    /**
     * Whether the reference is writeable.
     * @method Reference#isWrite
     * @return {boolean}
     */
    Reference.prototype.isWrite = function isWrite() {
        return !!(this.flag & Reference.WRITE);
    };

    /**
     * Whether the reference is readable.
     * @method Reference#isRead
     * @return {boolean}
     */
    Reference.prototype.isRead = function isRead() {
        return !!(this.flag & Reference.READ);
    };

    /**
     * Whether the reference is read-only.
     * @method Reference#isReadOnly
     * @return {boolean}
     */
    Reference.prototype.isReadOnly = function isReadOnly() {
        return this.flag === Reference.READ;
    };

    /**
     * Whether the reference is write-only.
     * @method Reference#isWriteOnly
     * @return {boolean}
     */
    Reference.prototype.isWriteOnly = function isWriteOnly() {
        return this.flag === Reference.WRITE;
    };

    /**
     * Whether the reference is read-write.
     * @method Reference#isReadWrite
     * @return {boolean}
     */
    Reference.prototype.isReadWrite = function isReadWrite() {
        return this.flag === Reference.RW;
    };

    /**
     * A Variable represents a locally scoped identifier. These include arguments to
     * functions.
     * @class Variable
     */
    function Variable(name, scope) {
        /**
         * The variable name, as given in the source code.
         * @member {String} Variable#name
         */
        this.name = name;
        /**
         * List of defining occurrences of this variable (like in 'var ...'
         * statements or as parameter), as AST nodes.
         * @member {esprima.Identifier[]} Variable#identifiers
         */
        this.identifiers = [];
        /**
         * List of {@link Reference|references} of this variable (excluding parameter entries)
         * in its defining scope and all nested scopes. For defining
         * occurrences only see {@link Variable#defs}.
         * @member {Reference[]} Variable#references
         */
        this.references = [];

        /**
         * List of defining occurrences of this variable (like in 'var ...'
         * statements or as parameter), as custom objects.
         * @typedef {Object} DefEntry
         * @property {String} DefEntry.type - the type of the occurrence (e.g.
         *      "Parameter", "Variable", ...)
         * @property {esprima.Identifier} DefEntry.name - the identifier AST node of the occurrence
         * @property {esprima.Node} DefEntry.node - the enclosing node of the
         *      identifier
         * @property {esprima.Node} [DefEntry.parent] - the enclosing statement
         *      node of the identifier
         * @member {DefEntry[]} Variable#defs
         */
        this.defs = [];

        this.tainted = false;
        /**
         * Whether this is a stack variable.
         * @member {boolean} Variable#stack
         */
        this.stack = true;
        /**
         * Reference to the enclosing Scope.
         * @member {Scope} Variable#scope
         */
        this.scope = scope;
    }

    Variable.CatchClause = 'CatchClause';
    Variable.Parameter = 'Parameter';
    Variable.FunctionName = 'FunctionName';
    Variable.ClassName = 'ClassName';
    Variable.Variable = 'Variable';
    Variable.ImportBinding = 'ImportBinding';
    Variable.TDZ = 'TDZ';
    Variable.ImplicitGlobalVariable = 'ImplicitGlobalVariable';

    function isStrictScope(scope, block, isMethodDefinition, useDirective) {
        var body, i, iz, stmt, expr;

        // When upper scope is exists and strict, inner scope is also strict.
        if (scope.upper && scope.upper.isStrict) {
            return true;
        }

        // ArrowFunctionExpression's scope is always strict scope.
        if (block.type === Syntax.ArrowFunctionExpression) {
            return true;
        }

        if (isMethodDefinition) {
            return true;
        }

        if (scope.type === 'class' || scope.type === 'module') {
            return true;
        }

        if (scope.type === 'block' || scope.type === 'switch') {
            return false;
        }

        if (scope.type === 'function') {
            if (block.type === 'Program') {
                body = block;
            } else {
                body = block.body;
            }
        } else if (scope.type === 'global') {
            body = block;
        } else {
            return false;
        }

        // Search 'use strict' directive.
        if (useDirective) {
            for (i = 0, iz = body.body.length; i < iz; ++i) {
                stmt = body.body[i];
                if (stmt.type !== 'DirectiveStatement') {
                    break;
                }
                if (stmt.raw === '"use strict"' || stmt.raw === '\'use strict\'') {
                    return true;
                }
            }
        } else {
            for (i = 0, iz = body.body.length; i < iz; ++i) {
                stmt = body.body[i];
                if (stmt.type !== Syntax.ExpressionStatement) {
                    break;
                }
                expr = stmt.expression;
                if (expr.type !== Syntax.Literal || typeof expr.value !== 'string') {
                    break;
                }
                if (expr.raw != null) {
                    if (expr.raw === '"use strict"' || expr.raw === '\'use strict\'') {
                        return true;
                    }
                } else {
                    if (expr.value === 'use strict') {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function registerScope(scopeManager, scope) {
        var scopes;

        scopeManager.scopes.push(scope);

        scopes = scopeManager.__nodeToScope.get(scope.block);
        if (scopes) {
            scopes.push(scope);
        } else {
            scopeManager.__nodeToScope.set(scope.block, [ scope ]);
        }
    }

    /* Special Scope types. */
    var SCOPE_NORMAL = 0,
        SCOPE_MODULE = 1,
        SCOPE_FUNCTION_EXPRESSION_NAME = 2,
        SCOPE_TDZ = 3,
        SCOPE_FUNCTION = 4;

    /**
     * @class Scope
     */
    function Scope(scopeManager, block, isMethodDefinition, scopeType) {
        /**
         * One of 'catch', 'with', 'function', 'global' or 'block'.
         * @member {String} Scope#type
         */
        this.type =
            (scopeType === SCOPE_TDZ) ? 'TDZ' :
            (scopeType === SCOPE_MODULE) ? 'module' :
            (block.type === Syntax.BlockStatement) ? 'block' :
            (block.type === Syntax.SwitchStatement) ? 'switch' :
            (scopeType === SCOPE_FUNCTION || block.type === Syntax.FunctionExpression || block.type === Syntax.FunctionDeclaration || block.type === Syntax.ArrowFunctionExpression) ? 'function' :
            (block.type === Syntax.CatchClause) ? 'catch' :
            (block.type === Syntax.ForInStatement || block.type === Syntax.ForOfStatement || block.type === Syntax.ForStatement) ? 'for' :
            (block.type === Syntax.WithStatement) ? 'with' :
            (block.type === Syntax.ClassExpression || block.type === Syntax.ClassDeclaration) ? 'class' : 'global';
         /**
         * The scoped {@link Variable}s of this scope, as <code>{ Variable.name
         * : Variable }</code>.
         * @member {Map} Scope#set
         */
        this.set = new Map();
        /**
         * The tainted variables of this scope, as <code>{ Variable.name :
         * boolean }</code>.
         * @member {Map} Scope#taints */
        this.taints = new Map();
        /**
         * Generally, through the lexical scoping of JS you can always know
         * which variable an identifier in the source code refers to. There are
         * a few exceptions to this rule. With 'global' and 'with' scopes you
         * can only decide at runtime which variable a reference refers to.
         * Moreover, if 'eval()' is used in a scope, it might introduce new
         * bindings in this or its prarent scopes.
         * All those scopes are considered 'dynamic'.
         * @member {boolean} Scope#dynamic
         */
        this.dynamic = this.type === 'global' || this.type === 'with';
        /**
         * A reference to the scope-defining syntax node.
         * @member {esprima.Node} Scope#block
         */
        this.block = block;
         /**
         * The {@link Reference|references} that are not resolved with this scope.
         * @member {Reference[]} Scope#through
         */
        this.through = [];
         /**
         * The scoped {@link Variable}s of this scope. In the case of a
         * 'function' scope this includes the automatic argument <em>arguments</em> as
         * its first element, as well as all further formal arguments.
         * @member {Variable[]} Scope#variables
         */
        this.variables = [];
         /**
         * Any variable {@link Reference|reference} found in this scope. This
         * includes occurrences of local variables as well as variables from
         * parent scopes (including the global scope). For local variables
         * this also includes defining occurrences (like in a 'var' statement).
         * In a 'function' scope this does not include the occurrences of the
         * formal parameter in the parameter list.
         * @member {Reference[]} Scope#references
         */
        this.references = [];

         /**
         * For 'global' and 'function' scopes, this is a self-reference. For
         * other scope types this is the <em>variableScope</em> value of the
         * parent scope.
         * @member {Scope} Scope#variableScope
         */
        this.variableScope =
            (this.type === 'global' || this.type === 'function' || this.type === 'module') ? this : scopeManager.__currentScope.variableScope;
         /**
         * Whether this scope is created by a FunctionExpression.
         * @member {boolean} Scope#functionExpressionScope
         */
        this.functionExpressionScope = false;
         /**
         * Whether this is a scope that contains an 'eval()' invocation.
         * @member {boolean} Scope#directCallToEvalScope
         */
        this.directCallToEvalScope = false;
         /**
         * @member {boolean} Scope#thisFound
         */
        this.thisFound = false;

        this.__left = [];

        if (scopeType === SCOPE_FUNCTION_EXPRESSION_NAME) {
            this.__define(block.id, {
                type: Variable.FunctionName,
                name: block.id,
                node: block
            });
            this.functionExpressionScope = true;
        } else {
            // section 9.2.13, FunctionDeclarationInstantiation.
            // NOTE Arrow functions never have an arguments objects.
            if (this.type === 'function' && this.block.type !== Syntax.ArrowFunctionExpression) {
                this.__defineArguments();
            }

            if (block.type === Syntax.FunctionExpression && block.id) {
                scopeManager.__nestFunctionExpressionNameScope(block, isMethodDefinition);
            }
        }

         /**
         * Reference to the parent {@link Scope|scope}.
         * @member {Scope} Scope#upper
         */
        this.upper = scopeManager.__currentScope;
         /**
         * Whether 'use strict' is in effect in this scope.
         * @member {boolean} Scope#isStrict
         */
        this.isStrict = isStrictScope(this, block, isMethodDefinition, scopeManager.__useDirective());

         /**
         * List of nested {@link Scope}s.
         * @member {Scope[]} Scope#childScopes
         */
        this.childScopes = [];
        if (scopeManager.__currentScope) {
            scopeManager.__currentScope.childScopes.push(this);
        }


        // RAII
        scopeManager.__currentScope = this;
        if (this.type === 'global') {
            scopeManager.globalScope = this;
            scopeManager.globalScope.implicit = {
                set: new Map(),
                variables: [],
                /**
                * List of {@link Reference}s that are left to be resolved (i.e. which
                * need to be linked to the variable they refer to).
                * @member {Reference[]} Scope#implicit#left
                */
                left: []
            };
        }

        registerScope(scopeManager, this);
    }

    Scope.prototype.__close = function __close(scopeManager) {
        var i, iz, ref, current, implicit, info;

        // Because if this is global environment, upper is null
        if (!this.dynamic || scopeManager.__isOptimistic()) {
            // static resolve
            for (i = 0, iz = this.__left.length; i < iz; ++i) {
                ref = this.__left[i];
                if (!this.__resolve(ref)) {
                    this.__delegateToUpperScope(ref);
                }
            }
        } else {
            // this is "global" / "with" / "function with eval" environment
            if (this.type === 'with') {
                for (i = 0, iz = this.__left.length; i < iz; ++i) {
                    ref = this.__left[i];
                    ref.tainted = true;
                    this.__delegateToUpperScope(ref);
                }
            } else {
                for (i = 0, iz = this.__left.length; i < iz; ++i) {
                    // notify all names are through to global
                    ref = this.__left[i];
                    current = this;
                    do {
                        current.through.push(ref);
                        current = current.upper;
                    } while (current);
                }
            }
        }

        if (this.type === 'global') {
            implicit = [];
            for (i = 0, iz = this.__left.length; i < iz; ++i) {
                ref = this.__left[i];
                if (ref.__maybeImplicitGlobal && !this.set.has(ref.identifier.name)) {
                    implicit.push(ref.__maybeImplicitGlobal);
                }
            }

            // create an implicit global variable from assignment expression
            for (i = 0, iz = implicit.length; i < iz; ++i) {
                info = implicit[i];
                this.__defineImplicit(info.pattern, {
                    type: Variable.ImplicitGlobalVariable,
                    name: info.pattern,
                    node: info.node
                });
            }

            this.implicit.left = this.__left;
        }

        this.__left = null;
        scopeManager.__currentScope = this.upper;
    };

    Scope.prototype.__resolve = function __resolve(ref) {
        var variable, name;
        name = ref.identifier.name;
        if (this.set.has(name)) {
            variable = this.set.get(name);
            variable.references.push(ref);
            variable.stack = variable.stack && ref.from.variableScope === this.variableScope;
            if (ref.tainted) {
                variable.tainted = true;
                this.taints.set(variable.name, true);
            }
            ref.resolved = variable;
            return true;
        }
        return false;
    };

    Scope.prototype.__delegateToUpperScope = function __delegateToUpperScope(ref) {
        if (this.upper) {
            this.upper.__left.push(ref);
        }
        this.through.push(ref);
    };

    Scope.prototype.__defineGeneric = function (name, set, variables, node, info) {
        var variable;

        variable = set.get(name);
        if (!variable) {
            variable = new Variable(name, this);
            set.set(name, variable);
            variables.push(variable);
        }

        if (info) {
            variable.defs.push(info);
        }
        if (node) {
            variable.identifiers.push(node);
        }
    };

    Scope.prototype.__defineArguments = function () {
        this.__defineGeneric('arguments', this.set, this.variables);
        this.taints.set('arguments', true);
    };

    Scope.prototype.__defineImplicit = function (node, info) {
        if (node && node.type === Syntax.Identifier) {
            this.__defineGeneric(node.name, this.implicit.set, this.implicit.variables, node, info);
        }
    };

    Scope.prototype.__define = function (node, info) {
        if (node && node.type === Syntax.Identifier) {
            this.__defineGeneric(node.name, this.set, this.variables, node, info);
        }
    };

    Scope.prototype.__referencing = function __referencing(node, assign, writeExpr, maybeImplicitGlobal, partial) {
        var ref;
        // because Array element may be null
        if (node && node.type === Syntax.Identifier) {
            ref = new Reference(node, this, assign || Reference.READ, writeExpr, maybeImplicitGlobal, !!partial);
            this.references.push(ref);
            this.__left.push(ref);
        }
    };

    Scope.prototype.__detectEval = function __detectEval() {
        var current;
        current = this;
        this.directCallToEvalScope = true;
        do {
            current.dynamic = true;
            current = current.upper;
        } while (current);
    };

    Scope.prototype.__detectThis = function __detectThis() {
        this.thisFound = true;
    };

    Scope.prototype.__isClosed = function isClosed() {
        return this.__left === null;
    };

    // API Scope#resolve(name)
    // returns resolved reference
    Scope.prototype.resolve = function resolve(ident) {
        var ref, i, iz;
        assert(this.__isClosed(), 'scope should be closed');
        assert(ident.type === Syntax.Identifier, 'target should be identifier');
        for (i = 0, iz = this.references.length; i < iz; ++i) {
            ref = this.references[i];
            if (ref.identifier === ident) {
                return ref;
            }
        }
        return null;
    };

    // API Scope#isStatic
    // returns this scope is static
    Scope.prototype.isStatic = function isStatic() {
        return !this.dynamic;
    };

    // API Scope#isArgumentsMaterialized
    // return this scope has materialized arguments
    Scope.prototype.isArgumentsMaterialized = function isArgumentsMaterialized() {
        // TODO(Constellation)
        // We can more aggressive on this condition like this.
        //
        // function t() {
        //     // arguments of t is always hidden.
        //     function arguments() {
        //     }
        // }
        var variable;

        // This is not function scope
        if (this.type !== 'function') {
            return true;
        }

        if (!this.isStatic()) {
            return true;
        }

        variable = this.set.get('arguments');
        assert(variable, 'always have arguments variable');
        return variable.tainted || variable.references.length  !== 0;
    };

    // API Scope#isThisMaterialized
    // return this scope has materialized `this` reference
    Scope.prototype.isThisMaterialized = function isThisMaterialized() {
        // This is not function scope
        if (this.type !== 'function') {
            return true;
        }
        if (!this.isStatic()) {
            return true;
        }
        return this.thisFound;
    };

    Scope.prototype.isUsedName = function (name) {
        if (this.set.has(name)) {
            return true;
        }
        for (var i = 0, iz = this.through.length; i < iz; ++i) {
            if (this.through[i].identifier.name === name) {
                return true;
            }
        }
        return false;
    };

    /**
     * @class ScopeManager
     */
    function ScopeManager(options) {
        this.scopes = [];
        this.globalScope = null;
        this.__nodeToScope = new WeakMap();
        this.__currentScope = null;
        this.__options = options;
    }

    ScopeManager.prototype.__useDirective = function () {
        return this.__options.directive;
    };

    ScopeManager.prototype.__isOptimistic = function () {
        return this.__options.optimistic;
    };

    ScopeManager.prototype.__ignoreEval = function () {
        return this.__options.ignoreEval;
    };

    ScopeManager.prototype.__isNodejsScope = function () {
        return this.__options.nodejsScope;
    };

    ScopeManager.prototype.isModule = function () {
        return this.__options.sourceType === 'module';
    };

    // Returns appropliate scope for this node.
    ScopeManager.prototype.__get = function __get(node) {
        return this.__nodeToScope.get(node);
    };

    ScopeManager.prototype.acquire = function acquire(node, inner) {
        var scopes, scope, i, iz;

        function predicate(scope) {
            if (scope.type === 'function' && scope.functionExpressionScope) {
                return false;
            }
            if (scope.type === 'TDZ') {
                return false;
            }
            return true;
        }

        scopes = this.__get(node);
        if (!scopes || scopes.length === 0) {
            return null;
        }

        // Heuristic selection from all scopes.
        // If you would like to get all scopes, please use ScopeManager#acquireAll.
        if (scopes.length === 1) {
            return scopes[0];
        }

        if (inner) {
            for (i = scopes.length - 1; i >= 0; --i) {
                scope = scopes[i];
                if (predicate(scope)) {
                    return scope;
                }
            }
        } else {
            for (i = 0, iz = scopes.length; i < iz; ++i) {
                scope = scopes[i];
                if (predicate(scope)) {
                    return scope;
                }
            }
        }

        return null;
    };

    ScopeManager.prototype.acquireAll = function acquire(node) {
        return this.__get(node);
    };

    ScopeManager.prototype.release = function release(node, inner) {
        var scopes, scope;
        scopes = this.__get(node);
        if (scopes && scopes.length) {
            scope = scopes[0].upper;
            if (!scope) {
                return null;
            }
            return this.acquire(scope.block, inner);
        }
        return null;
    };

    ScopeManager.prototype.attach = function attach() { };

    ScopeManager.prototype.detach = function detach() { };

    ScopeManager.prototype.__nestScope = function (node, isMethodDefinition) {
        return new Scope(this, node, isMethodDefinition, SCOPE_NORMAL);
    };

    ScopeManager.prototype.__nestForceFunctionScope = function (node) {
        return new Scope(this, node, false, SCOPE_FUNCTION);
    };

    ScopeManager.prototype.__nestModuleScope = function (node) {
        return new Scope(this, node, false, SCOPE_MODULE);
    };

    ScopeManager.prototype.__nestTDZScope = function (node) {
        return new Scope(this, node, false, SCOPE_TDZ);
    };

    ScopeManager.prototype.__nestFunctionExpressionNameScope = function (node, isMethodDefinition) {
        return new Scope(this, node, isMethodDefinition, SCOPE_FUNCTION_EXPRESSION_NAME);
    };

    ScopeManager.prototype.__isES6 = function () {
        return this.__options.ecmaVersion >= 6;
    };

    function traverseIdentifierInPattern(rootPattern, callback) {
        estraverse.traverse(rootPattern, {
            enter: function (pattern, parent) {
                var i, iz, element, property;

                switch (pattern.type) {
                    case Syntax.Identifier:
                        // Toplevel identifier.
                        if (parent === null) {
                            callback(pattern, true);
                        }
                        break;

                    case Syntax.SpreadElement:
                        if (pattern.argument.type === Syntax.Identifier) {
                            callback(pattern.argument, false);
                        }
                        break;

                    case Syntax.ObjectPattern:
                        for (i = 0, iz = pattern.properties.length; i < iz; ++i) {
                            property = pattern.properties[i];
                            if (property.shorthand) {
                                callback(property.key, false);
                                continue;
                            }
                            if (property.value.type === Syntax.Identifier) {
                                callback(property.value, false);
                                continue;
                            }
                        }
                        break;

                    case Syntax.ArrayPattern:
                        for (i = 0, iz = pattern.elements.length; i < iz; ++i) {
                            element = pattern.elements[i];
                            if (element && element.type === Syntax.Identifier) {
                                callback(element, false);
                            }
                        }
                        break;
                }
            }
        });
    }

    function isPattern(node) {
        var nodeType = node.type;
        return nodeType === Syntax.Identifier || nodeType === Syntax.ObjectPattern || nodeType === Syntax.ArrayPattern || nodeType === Syntax.SpreadElement;
    }

    // Importing ImportDeclaration.
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-moduledeclarationinstantiation
    // FIXME: Now, we don't create module environment, because the context is
    // implementation dependent.

    function Importer(declaration, referencer) {
        esrecurse.Visitor.call(this, this);
        this.declaration = declaration;
        this.referencer = referencer;
    }
    util.inherits(Importer, esrecurse.Visitor);

    Importer.prototype.visitImport = function (id, specifier) {
        var that = this;
        that.referencer.visitPattern(id, function (pattern) {
            that.referencer.currentScope().__define(pattern, {
                type: Variable.ImportBinding,
                name: pattern,
                node: specifier,
                parent: that.declaration
            });
        });
    };

    Importer.prototype.ImportNamespaceSpecifier = function (node) {
        if (node.id) {
            this.visitImport(node.id, node);
        }
    };

    Importer.prototype.ImportDefaultSpecifier = function (node) {
        this.visitImport(node.id, node);
    };

    Importer.prototype.ImportSpecifier = function (node) {
        if (node.name) {
            this.visitImport(node.name, node);
        } else {
            this.visitImport(node.id, node);
        }
    };

    // Referencing variables and creating bindings.

    function Referencer(scopeManager) {
        esrecurse.Visitor.call(this, this);
        this.scopeManager = scopeManager;
        this.parent = null;
        this.isInnerMethodDefinition = false;
    }

    util.inherits(Referencer, esrecurse.Visitor);

    extend(Referencer.prototype, {
        currentScope: function () {
            return this.scopeManager.__currentScope;
        },

        close: function (node) {
            while (this.currentScope() && node === this.currentScope().block) {
                this.currentScope().__close(this.scopeManager);
            }
        },

        pushInnerMethodDefinition: function (isInnerMethodDefinition) {
            var previous = this.isInnerMethodDefinition;
            this.isInnerMethodDefinition = isInnerMethodDefinition;
            return previous;
        },

        popInnerMethodDefinition: function (isInnerMethodDefinition) {
            this.isInnerMethodDefinition = isInnerMethodDefinition;
        },

        materializeTDZScope: function (node, iterationNode) {
            // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-runtime-semantics-forin-div-ofexpressionevaluation-abstract-operation
            // TDZ scope hides the declaration's names.
            this.scopeManager.__nestTDZScope(node, iterationNode);
            this.visitVariableDeclaration(this.currentScope(), Variable.TDZ, iterationNode.left, 0);
        },

        materializeIterationScope: function (node) {
            // Generate iteration scope for upper ForIn/ForOf Statements.
            // parent node for __nestScope is only necessary to
            // distinguish MethodDefinition.
            var letOrConstDecl, that = this;
            this.scopeManager.__nestScope(node, false);
            letOrConstDecl = node.left;
            this.visitVariableDeclaration(this.currentScope(), Variable.Variable, letOrConstDecl, 0);
            this.visitPattern(letOrConstDecl.declarations[0].id, function (pattern) {
                that.currentScope().__referencing(pattern, Reference.WRITE, node.right, null, true);
            });
        },

        visitPattern: function (node, callback) {
            traverseIdentifierInPattern(node, callback);
        },

        visitFunction: function (node) {
            var i, iz, that = this;
            // FunctionDeclaration name is defined in upper scope
            // NOTE: Not referring variableScope. It is intended.
            // Since
            //  in ES5, FunctionDeclaration should be in FunctionBody.
            //  in ES6, FunctionDeclaration should be block scoped.
            if (node.type === Syntax.FunctionDeclaration) {
                // id is defined in upper scope
                this.currentScope().__define(node.id, {
                    type: Variable.FunctionName,
                    name: node.id,
                    node: node
                });
            }

            // Consider this function is in the MethodDefinition.
            this.scopeManager.__nestScope(node, this.isInnerMethodDefinition);

            for (i = 0, iz = node.params.length; i < iz; ++i) {
                this.visitPattern(node.params[i], function (pattern) {
                    that.currentScope().__define(pattern, {
                        type: Variable.Parameter,
                        name: pattern,
                        node: node,
                        index: i,
                        rest: false
                    });
                });
            }


            // if there's a rest argument, add that
            if (node.rest) {
                this.visitPattern(node.rest, function (pattern) {
                    that.currentScope().__define(pattern, {
                        type: Variable.Parameter,
                        name: pattern,
                        node: node,
                        index: node.params.length,
                        rest: true
                    });
                });
            }

            // Skip BlockStatement to prevent creating BlockStatement scope.
            if (node.body.type === Syntax.BlockStatement) {
                this.visitChildren(node.body);
            } else {
                this.visit(node.body);
            }

            this.close(node);
        },

        visitClass: function (node) {
            if (node.type === Syntax.ClassDeclaration) {
                this.currentScope().__define(node.id, {
                    type: Variable.ClassName,
                    name: node.id,
                    node: node
                });
            }

            // FIXME: Maybe consider TDZ.
            this.visit(node.superClass);

            this.scopeManager.__nestScope(node);

            if (node.id) {
                this.currentScope().__define(node.id, {
                    type: Variable.ClassName,
                    name: node.id,
                    node: node
                });
            }
            this.visit(node.body);

            this.close(node);
        },

        visitProperty: function (node) {
            var previous, isMethodDefinition;
            if (node.computed) {
                this.visit(node.key);
            }

            isMethodDefinition = node.type === Syntax.MethodDefinition || node.method;
            if (isMethodDefinition) {
                previous = this.pushInnerMethodDefinition(true);
            }
            this.visit(node.value);
            if (isMethodDefinition) {
                this.popInnerMethodDefinition(previous);
            }
        },

        visitForIn: function (node) {
            var that = this;
            if (node.left.type === Syntax.VariableDeclaration && node.left.kind !== 'var') {
                this.materializeTDZScope(node.right, node);
                this.visit(node.right);
                this.close(node.right);

                this.materializeIterationScope(node);
                this.visit(node.body);
                this.close(node);
            } else {
                if (node.left.type === Syntax.VariableDeclaration) {
                    this.visit(node.left);
                    this.visitPattern(node.left.declarations[0].id, function (pattern) {
                        that.currentScope().__referencing(pattern, Reference.WRITE, node.right, null, true);
                    });
                } else {
                    if (!isPattern(node.left)) {
                        this.visit(node.left);
                    }
                    this.visitPattern(node.left, function (pattern) {
                        var maybeImplicitGlobal = null;
                        if (!that.currentScope().isStrict) {
                            maybeImplicitGlobal = {
                                pattern: pattern,
                                node: node
                            };
                        }
                        that.currentScope().__referencing(pattern, Reference.WRITE, node.right, maybeImplicitGlobal, true);
                    });
                }
                this.visit(node.right);
                this.visit(node.body);
            }
        },

        visitVariableDeclaration: function (variableTargetScope, type, node, index) {
            var decl, init, that = this;

            decl = node.declarations[index];
            init = decl.init;
            // FIXME: Don't consider initializer with complex patterns.
            // Such as,
            // var [a, b, c = 20] = array;
            this.visitPattern(decl.id, function (pattern, toplevel) {
                variableTargetScope.__define(pattern, {
                    type: type,
                    name: pattern,
                    node: decl,
                    index: index,
                    kind: node.kind,
                    parent: node
                });

                if (init) {
                    that.currentScope().__referencing(pattern, Reference.WRITE, init, null, !toplevel);
                }
            });
        },

        AssignmentExpression: function (node) {
            var that = this;
            if (isPattern(node.left)) {
                if (node.operator === '=') {
                    this.visitPattern(node.left, function (pattern, toplevel) {
                        var maybeImplicitGlobal = null;
                        if (!that.currentScope().isStrict) {
                            maybeImplicitGlobal = {
                                pattern: pattern,
                                node: node
                            };
                        }
                        that.currentScope().__referencing(pattern, Reference.WRITE, node.right, maybeImplicitGlobal, !toplevel);
                    });
                } else {
                    that.currentScope().__referencing(node.left, Reference.RW, node.right);
                }
            } else {
                this.visit(node.left);
            }
            this.visit(node.right);
        },

        CatchClause: function (node) {
            var that = this;
            this.scopeManager.__nestScope(node);

            this.visitPattern(node.param, function (pattern) {
                that.currentScope().__define(pattern, {
                    type: Variable.CatchClause,
                    name: node.param,
                    node: node
                });
            });
            this.visit(node.body);

            this.close(node);
        },

        Program: function (node) {
            this.scopeManager.__nestScope(node);

            if (this.scopeManager.__isNodejsScope()) {
                // Force strictness of GlobalScope to false when using node.js scope.
                this.currentScope().isStrict = false;
                this.scopeManager.__nestForceFunctionScope(node);
            }

            if (this.scopeManager.__isES6() && this.scopeManager.isModule()) {
                this.scopeManager.__nestModuleScope(node);
            }

            this.visitChildren(node);
            this.close(node);
        },

        Identifier: function (node) {
            this.currentScope().__referencing(node);
        },

        UpdateExpression: function (node) {
            if (isPattern(node.argument)) {
                this.currentScope().__referencing(node.argument, Reference.RW, null);
            } else {
                this.visitChildren(node);
            }
        },

        MemberExpression: function (node) {
            this.visit(node.object);
            if (node.computed) {
                this.visit(node.property);
            }
        },

        Property: function (node) {
            this.visitProperty(node);
        },

        MethodDefinition: function (node) {
            this.visitProperty(node);
        },

        BreakStatement: function () {},

        ContinueStatement: function () {},

        LabeledStatement: function (node) {
            this.visit(node.body);
        },

        ForStatement: function (node) {
            // Create ForStatement declaration.
            // NOTE: In ES6, ForStatement dynamically generates
            // per iteration environment. However, escope is
            // a static analyzer, we only generate one scope for ForStatement.
            if (node.init && node.init.type === Syntax.VariableDeclaration && node.init.kind !== 'var') {
                this.scopeManager.__nestScope(node);
            }

            this.visitChildren(node);

            this.close(node);
        },

        ClassExpression: function (node) {
            this.visitClass(node);
        },

        ClassDeclaration: function (node) {
            this.visitClass(node);
        },

        CallExpression: function (node) {
            // Check this is direct call to eval
            if (!this.scopeManager.__ignoreEval() && node.callee.type === Syntax.Identifier && node.callee.name === 'eval') {
                // NOTE: This should be `variableScope`. Since direct eval call always creates Lexical environment and
                // let / const should be enclosed into it. Only VariableDeclaration affects on the caller's environment.
                this.currentScope().variableScope.__detectEval();
            }
            this.visitChildren(node);
        },

        BlockStatement: function (node) {
            if (this.scopeManager.__isES6()) {
                this.scopeManager.__nestScope(node);
            }

            this.visitChildren(node);

            this.close(node);
        },

        ThisExpression: function () {
            this.currentScope().variableScope.__detectThis();
        },

        WithStatement: function (node) {
            this.visit(node.object);
            // Then nest scope for WithStatement.
            this.scopeManager.__nestScope(node);

            this.visit(node.body);

            this.close(node);
        },

        VariableDeclaration: function (node) {
            var variableTargetScope, i, iz, decl;
            variableTargetScope = (node.kind === 'var') ? this.currentScope().variableScope : this.currentScope();
            for (i = 0, iz = node.declarations.length; i < iz; ++i) {
                decl = node.declarations[i];
                this.visitVariableDeclaration(variableTargetScope, Variable.Variable, node, i);
                if (decl.init) {
                    this.visit(decl.init);
                }
            }
        },

        // sec 13.11.8
        SwitchStatement: function (node) {
            var i, iz;

            this.visit(node.discriminant);

            if (this.scopeManager.__isES6()) {
                this.scopeManager.__nestScope(node);
            }

            for (i = 0, iz = node.cases.length; i < iz; ++i) {
                this.visit(node.cases[i]);
            }

            this.close(node);
        },

        FunctionDeclaration: function (node) {
            this.visitFunction(node);
        },

        FunctionExpression: function (node) {
            this.visitFunction(node);
        },

        ForOfStatement: function (node) {
            this.visitForIn(node);
        },

        ForInStatement: function (node) {
            this.visitForIn(node);
        },

        ArrowFunctionExpression: function (node) {
            this.visitFunction(node);
        },

        ImportDeclaration: function (node) {
            var importer;

            assert(this.scopeManager.__isES6() && this.scopeManager.isModule());

            importer = new Importer(node, this);
            importer.visit(node);
        },

        ExportDeclaration: function (node) {
            if (node.source) {
                return;
            }
            if (node.declaration) {
                this.visit(node.declaration);
                return;
            }

            this.visitChildren(node);
        },

        ExportSpecifier: function (node) {
            this.visit(node.id);
        }
    });

    /**
     * Main interface function. Takes an Esprima syntax tree and returns the
     * analyzed scopes.
     * @function analyze
     * @param {esprima.Tree} tree
     * @param {Object} providedOptions - Options that tailor the scope analysis
     * @param {boolean} [providedOptions.optimistic=false] - the optimistic flag
     * @param {boolean} [providedOptions.directive=false]- the directive flag
     * @param {boolean} [providedOptions.nodejsScope=false]- whether the whole
     * script is executed under node.js environment. When enabled, escope adds
     * a function scope immediately following the global scope.
     * @param {boolean} [providedOptions.ignoreEval=false]- whether to check 'eval()' calls
     * @param {string} [providedOptions.sourceType='script']- the source type of the script. one of 'script' and 'module'
     * @param {number} [providedOptions.ecmaVersion=5]- which ECMAScript version is considered
     * @return {ScopeManager}
     */
    function analyze(tree, providedOptions) {
        var scopeManager, referencer, options;

        options = updateDeeply(defaultOptions(), providedOptions);

        scopeManager = new ScopeManager(options);

        referencer = new Referencer(scopeManager);
        referencer.visit(tree);

        assert(scopeManager.__currentScope === null);

        return scopeManager;
    }

    /** @name module:escope.version */
    exports.version = require('./package.json').version;
    /** @name module:escope.Reference */
    exports.Reference = Reference;
    /** @name module:escope.Variable */
    exports.Variable = Variable;
    /** @name module:escope.Scope */
    exports.Scope = Scope;
    /** @name module:escope.ScopeManager */
    exports.ScopeManager = ScopeManager;
    /** @name module:escope.analyze */
    exports.analyze = analyze;
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./package.json":120,"es6-map":16,"es6-weak-map":71,"esrecurse":117,"estraverse":123,"util":7,"util-extend":119}],16:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Map : require('./polyfill');

},{"./is-implemented":17,"./polyfill":70}],17:[function(require,module,exports){
'use strict';

module.exports = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (map.size !== 3) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.entries !== 'function') return false;
	if (typeof map.forEach !== 'function') return false;
	if (typeof map.get !== 'function') return false;
	if (typeof map.has !== 'function') return false;
	if (typeof map.keys !== 'function') return false;
	if (typeof map.set !== 'function') return false;
	if (typeof map.values !== 'function') return false;

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) return false;
	if (!result.value) return false;
	if (result.value[0] !== 'raz') return false;
	if (result.value[1] !== 'one') return false;
	return true;
};

},{}],18:[function(require,module,exports){
// Exports true if environment provides native `Map` implementation,
// whatever that is.

'use strict';

module.exports = (function () {
	if (typeof Map === 'undefined') return false;
	return (Object.prototype.toString.call(Map.prototype) === '[object Map]');
}());

},{}],19:[function(require,module,exports){
'use strict';

module.exports = require('es5-ext/object/primitive-set')('key',
	'value', 'key+value');

},{"es5-ext/object/primitive-set":44}],20:[function(require,module,exports){
'use strict';

var setPrototypeOf    = require('es5-ext/object/set-prototype-of')
  , d                 = require('d')
  , Iterator          = require('es6-iterator')
  , toStringTagSymbol = require('es6-symbol').toStringTag
  , kinds             = require('./iterator-kinds')

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) kind = 'key+value';
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__values__[i];
		if (this.__kind__ === 'key') return this.__list__[i];
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
	d('c', 'Map Iterator'));

},{"./iterator-kinds":19,"d":22,"es5-ext/object/set-prototype-of":45,"es6-iterator":57,"es6-symbol":66}],21:[function(require,module,exports){
'use strict';

var copy       = require('es5-ext/object/copy')
  , map        = require('es5-ext/object/map')
  , callable   = require('es5-ext/object/valid-callable')
  , validValue = require('es5-ext/object/valid-value')

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, bindTo) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, bindTo*/) {
	var bindTo = arguments[1];
	return map(props, function (desc, name) {
		return define(name, desc, bindTo);
	});
};

},{"es5-ext/object/copy":34,"es5-ext/object/map":42,"es5-ext/object/valid-callable":48,"es5-ext/object/valid-value":49}],22:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":31,"es5-ext/object/is-callable":37,"es5-ext/object/normalize-options":43,"es5-ext/string/#/contains":50}],23:[function(require,module,exports){
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

'use strict';

var value = require('../../object/valid-value');

module.exports = function () {
	value(this).length = 0;
	return this;
};

},{"../../object/valid-value":49}],24:[function(require,module,exports){
'use strict';

var toPosInt = require('../../number/to-pos-integer')
  , value    = require('../../object/valid-value')

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this, i)) {
			val = this[i];
			if (val !== val) return i; //jslint: ignore
		}
	}
	return -1;
};

},{"../../number/to-pos-integer":29,"../../object/valid-value":49}],25:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Math.sign
	: require('./shim');

},{"./is-implemented":26,"./shim":27}],26:[function(require,module,exports){
'use strict';

module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') return false;
	return ((sign(10) === 1) && (sign(-20) === -1));
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return (value > 0) ? 1 : -1;
};

},{}],28:[function(require,module,exports){
'use strict';

var sign = require('../math/sign')

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

},{"../math/sign":25}],29:[function(require,module,exports){
'use strict';

var toInteger = require('./to-integer')

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };

},{"./to-integer":28}],30:[function(require,module,exports){
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

'use strict';

var isCallable = require('./is-callable')
  , callable   = require('./valid-callable')
  , value      = require('./valid-value')

  , call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(isCallable(compareFn) ? compareFn.bind(obj) : undefined);
		}
		return list[method](function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./is-callable":37,"./valid-callable":48,"./valid-value":49}],31:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":32,"./shim":33}],32:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],33:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":39,"../valid-value":49}],34:[function(require,module,exports){
'use strict';

var assign = require('./assign')
  , value  = require('./valid-value');

module.exports = function (obj) {
	var copy = Object(value(obj));
	if (copy !== obj) return copy;
	return assign({}, obj);
};

},{"./assign":31,"./valid-value":49}],35:[function(require,module,exports){
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

'use strict';

var create = Object.create, shim;

if (!require('./set-prototype-of/is-implemented')()) {
	shim = require('./set-prototype-of/shim');
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());

},{"./set-prototype-of/is-implemented":46,"./set-prototype-of/shim":47}],36:[function(require,module,exports){
'use strict';

module.exports = require('./_iterate')('forEach');

},{"./_iterate":30}],37:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],38:[function(require,module,exports){
'use strict';

var map = { function: true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};

},{}],39:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":40,"./shim":41}],40:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],41:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],42:[function(require,module,exports){
'use strict';

var callable = require('./valid-callable')
  , forEach  = require('./for-each')

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};

},{"./for-each":36,"./valid-callable":48}],43:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],44:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};

},{}],45:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.setPrototypeOf
	: require('./shim');

},{"./is-implemented":46,"./shim":47}],46:[function(require,module,exports){
'use strict';

var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};

},{}],47:[function(require,module,exports){
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

'use strict';

var isObject      = require('../is-object')
  , value         = require('../valid-value')

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

require('../create');

},{"../create":35,"../is-object":38,"../valid-value":49}],48:[function(require,module,exports){
'use strict';

module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],49:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],50:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":51,"./shim":52}],51:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],52:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],53:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};

},{}],54:[function(require,module,exports){
'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , contains       = require('es5-ext/string/#/contains')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});

},{"./":57,"d":22,"es5-ext/object/set-prototype-of":45,"es5-ext/string/#/contains":50}],55:[function(require,module,exports){
'use strict';

var callable = require('es5-ext/object/valid-callable')
  , isString = require('es5-ext/string/is-string')
  , get      = require('./get')

  , isArray = Array.isArray, call = Function.prototype.call;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		iterable.some(function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

},{"./get":56,"es5-ext/object/valid-callable":48,"es5-ext/string/is-string":53}],56:[function(require,module,exports){
'use strict';

var isString = require('es5-ext/string/is-string')
  , ArrayIterator  = require('./array')
  , StringIterator = require('./string')
  , iterable       = require('./valid-iterable')
  , iteratorSymbol = require('es6-symbol').iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};

},{"./array":54,"./string":64,"./valid-iterable":65,"es5-ext/string/is-string":53,"es6-symbol":59}],57:[function(require,module,exports){
'use strict';

var clear    = require('es5-ext/array/#/clear')
  , assign   = require('es5-ext/object/assign')
  , callable = require('es5-ext/object/valid-callable')
  , value    = require('es5-ext/object/valid-value')
  , d        = require('d')
  , autoBind = require('d/auto-bind')
  , Symbol   = require('es6-symbol')

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));

},{"d":22,"d/auto-bind":21,"es5-ext/array/#/clear":23,"es5-ext/object/assign":31,"es5-ext/object/valid-callable":48,"es5-ext/object/valid-value":49,"es6-symbol":59}],58:[function(require,module,exports){
'use strict';

var isString       = require('es5-ext/string/is-string')
  , iteratorSymbol = require('es6-symbol').iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};

},{"es5-ext/string/is-string":53,"es6-symbol":59}],59:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":60,"./polyfill":62}],60:[function(require,module,exports){
'use strict';

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }
	if (typeof Symbol.iterator === 'symbol') return true;

	// Return 'true' for polyfills
	if (typeof Symbol.isConcatSpreadable !== 'object') return false;
	if (typeof Symbol.iterator !== 'object') return false;
	if (typeof Symbol.toPrimitive !== 'object') return false;
	if (typeof Symbol.toStringTag !== 'object') return false;
	if (typeof Symbol.unscopables !== 'object') return false;

	return true;
};

},{}],61:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	return (x && ((typeof x === 'symbol') || (x['@@toStringTag'] === 'Symbol'))) || false;
};

},{}],62:[function(require,module,exports){
'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , Symbol, HiddenSymbol, globalSymbols = create(null);

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			defineProperty(this, name, d(value));
		}));
		return name;
	};
}());

HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return Symbol(description);
};
module.exports = Symbol = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(Symbol, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = Symbol(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),
	hasInstance: d('', Symbol('hasInstance')),
	isConcatSpreadable: d('', Symbol('isConcatSpreadable')),
	iterator: d('', Symbol('iterator')),
	match: d('', Symbol('match')),
	replace: d('', Symbol('replace')),
	search: d('', Symbol('search')),
	species: d('', Symbol('species')),
	split: d('', Symbol('split')),
	toPrimitive: d('', Symbol('toPrimitive')),
	toStringTag: d('', Symbol('toStringTag')),
	unscopables: d('', Symbol('unscopables'))
});
defineProperties(HiddenSymbol.prototype, {
	constructor: d(Symbol),
	toString: d('', function () { return this.__name__; })
});

defineProperties(Symbol.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(Symbol.prototype, Symbol.toPrimitive, d('',
	function () { return validateSymbol(this); }));
defineProperty(Symbol.prototype, Symbol.toStringTag, d('c', 'Symbol'));

defineProperty(HiddenSymbol.prototype, Symbol.toPrimitive,
	d('c', Symbol.prototype[Symbol.toPrimitive]));
defineProperty(HiddenSymbol.prototype, Symbol.toStringTag,
	d('c', Symbol.prototype[Symbol.toStringTag]));

},{"./validate-symbol":63,"d":22}],63:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":61}],64:[function(require,module,exports){
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});

},{"./":57,"d":22,"es5-ext/object/set-prototype-of":45}],65:[function(require,module,exports){
'use strict';

var isIterable = require('./is-iterable');

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

},{"./is-iterable":58}],66:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./is-implemented":67,"./polyfill":68,"dup":59}],67:[function(require,module,exports){
'use strict';

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }
	if (typeof Symbol.iterator === 'symbol') return true;

	// Return 'true' for polyfills
	if (typeof Symbol.isConcatSpreadable !== 'object') return false;
	if (typeof Symbol.isRegExp !== 'object') return false;
	if (typeof Symbol.iterator !== 'object') return false;
	if (typeof Symbol.toPrimitive !== 'object') return false;
	if (typeof Symbol.toStringTag !== 'object') return false;
	if (typeof Symbol.unscopables !== 'object') return false;

	return true;
};

},{}],68:[function(require,module,exports){
'use strict';

var d = require('d')

  , create = Object.create, defineProperties = Object.defineProperties
  , generateName, Symbol;

generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		return '@@' + desc;
	};
}());

module.exports = Symbol = function (description) {
	var symbol;
	if (this instanceof Symbol) {
		throw new TypeError('TypeError: Symbol is not a constructor');
	}
	symbol = create(Symbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};

Object.defineProperties(Symbol, {
	create: d('', Symbol('create')),
	hasInstance: d('', Symbol('hasInstance')),
	isConcatSpreadable: d('', Symbol('isConcatSpreadable')),
	isRegExp: d('', Symbol('isRegExp')),
	iterator: d('', Symbol('iterator')),
	toPrimitive: d('', Symbol('toPrimitive')),
	toStringTag: d('', Symbol('toStringTag')),
	unscopables: d('', Symbol('unscopables'))
});

defineProperties(Symbol.prototype, {
	properToString: d(function () {
		return 'Symbol (' + this.__description__ + ')';
	}),
	toString: d('', function () { return this.__name__; })
});
Object.defineProperty(Symbol.prototype, Symbol.toPrimitive, d('',
	function (hint) {
		throw new TypeError("Conversion of symbol objects is not allowed");
	}));
Object.defineProperty(Symbol.prototype, Symbol.toStringTag, d('c', 'Symbol'));

},{"d":22}],69:[function(require,module,exports){
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":22,"es5-ext/object/valid-callable":48}],70:[function(require,module,exports){
'use strict';

var clear          = require('es5-ext/array/#/clear')
  , eIndexOf       = require('es5-ext/array/#/e-index-of')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , callable       = require('es5-ext/object/valid-callable')
  , validValue     = require('es5-ext/object/valid-value')
  , d              = require('d')
  , ee             = require('event-emitter')
  , Symbol         = require('es6-symbol')
  , iterator       = require('es6-iterator/valid-iterable')
  , forOf          = require('es6-iterator/for-of')
  , Iterator       = require('./lib/iterator')
  , isNative       = require('./is-native-implemented')

  , call = Function.prototype.call, defineProperties = Object.defineProperties
  , MapPoly;

module.exports = MapPoly = function (/*iterable*/) {
	var iterable = arguments[0], keys, values;
	if (!(this instanceof MapPoly)) return new MapPoly(iterable);
	if (this.__mapKeysData__ !== undefined) {
		throw new TypeError(this + " cannot be reinitialized");
	}
	if (iterable != null) iterator(iterable);
	defineProperties(this, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) return;
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) return;
		keys.push(key);
		values.push(value);
	}, this);
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
	MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(MapPoly)
	});
}

ee(defineProperties(MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) return;
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return false;
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this.__mapValuesData__[result],
				this.__mapKeysData__[result], this);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return;
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
	}),
	keys: d(function () { return new Iterator(this, 'key'); }),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key), emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) this.emit('_add', index, key);
		return this;
	}),
	size: d.gs(function () { return this.__mapKeysData__.length; }),
	values: d(function () { return new Iterator(this, 'value'); }),
	toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));

},{"./is-native-implemented":18,"./lib/iterator":20,"d":22,"es5-ext/array/#/clear":23,"es5-ext/array/#/e-index-of":24,"es5-ext/object/set-prototype-of":45,"es5-ext/object/valid-callable":48,"es5-ext/object/valid-value":49,"es6-iterator/for-of":55,"es6-iterator/valid-iterable":65,"es6-symbol":66,"event-emitter":69}],71:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ?
		WeakMap : require('./polyfill');

},{"./is-implemented":72,"./polyfill":116}],72:[function(require,module,exports){
'use strict';

module.exports = function () {
	var map;
	if (typeof WeakMap !== 'function') return false;
	map = new WeakMap();
	if (typeof map.set !== 'function') return false;
	if (map.set({}, 1) !== map) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.has !== 'function') return false;

	return true;
};

},{}],73:[function(require,module,exports){
// Exports true if environment provides native `WeakMap` implementation,
// whatever that is.

'use strict';

module.exports = (function () {
	if (typeof WeakMap === 'undefined') return false;
	return (Object.prototype.toString.call(WeakMap.prototype) ===
			'[object WeakMap]');
}());

},{}],74:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21,"es5-ext/object/copy":81,"es5-ext/object/map":89,"es5-ext/object/valid-callable":94,"es5-ext/object/valid-value":96}],75:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22,"es5-ext/object/assign":78,"es5-ext/object/is-callable":84,"es5-ext/object/normalize-options":90,"es5-ext/string/#/contains":97}],76:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"../../object/valid-value":96,"dup":23}],77:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./is-callable":84,"./valid-callable":94,"./valid-value":96,"dup":30}],78:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./is-implemented":79,"./shim":80,"dup":31}],79:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],80:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"../keys":86,"../valid-value":96,"dup":33}],81:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"./assign":78,"./valid-value":96,"dup":34}],82:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"./set-prototype-of/is-implemented":92,"./set-prototype-of/shim":93,"dup":35}],83:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"./_iterate":77,"dup":36}],84:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],85:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"dup":38}],86:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"./is-implemented":87,"./shim":88,"dup":39}],87:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],88:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],89:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./for-each":83,"./valid-callable":94,"dup":42}],90:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],91:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"./is-implemented":92,"./shim":93,"dup":45}],92:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],93:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"../create":82,"../is-object":85,"../valid-value":96,"dup":47}],94:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],95:[function(require,module,exports){
'use strict';

var isObject = require('./is-object');

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};

},{"./is-object":85}],96:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],97:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"./is-implemented":98,"./shim":99,"dup":50}],98:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],99:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],100:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],101:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./":104,"d":75,"dup":54,"es5-ext/object/set-prototype-of":91,"es5-ext/string/#/contains":97}],102:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"./get":103,"dup":55,"es5-ext/object/valid-callable":94,"es5-ext/string/is-string":100}],103:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"./array":101,"./string":111,"./valid-iterable":112,"dup":56,"es5-ext/string/is-string":100,"es6-symbol":106}],104:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"d":75,"d/auto-bind":74,"dup":57,"es5-ext/array/#/clear":76,"es5-ext/object/assign":78,"es5-ext/object/valid-callable":94,"es5-ext/object/valid-value":96,"es6-symbol":106}],105:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58,"es5-ext/string/is-string":100,"es6-symbol":106}],106:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./is-implemented":107,"./polyfill":109,"dup":59}],107:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],108:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"dup":61}],109:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./validate-symbol":110,"d":75,"dup":62}],110:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"./is-symbol":108,"dup":63}],111:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./":104,"d":75,"dup":64,"es5-ext/object/set-prototype-of":91}],112:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"./is-iterable":105,"dup":65}],113:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./is-implemented":114,"./polyfill":115,"dup":59}],114:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"dup":67}],115:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"d":75,"dup":68}],116:[function(require,module,exports){
'use strict';

var setPrototypeOf    = require('es5-ext/object/set-prototype-of')
  , object            = require('es5-ext/object/valid-object')
  , value             = require('es5-ext/object/valid-value')
  , d                 = require('d')
  , getIterator       = require('es6-iterator/get')
  , forOf             = require('es6-iterator/for-of')
  , toStringTagSymbol = require('es6-symbol').toStringTag
  , isNative          = require('./is-native-implemented')

  , isArray = Array.isArray, defineProperty = Object.defineProperty, random = Math.random
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , genId, WeakMapPoly;

genId = (function () {
	var generated = Object.create(null);
	return function () {
		var id;
		do { id = random().toString(36).slice(2); } while (generated[id]);
		generated[id] = true;
		return id;
	};
}());

module.exports = WeakMapPoly = function (/*iterable*/) {
	var iterable = arguments[0];
	if (!(this instanceof WeakMapPoly)) return new WeakMapPoly(iterable);
	if (this.__weakMapData__ !== undefined) {
		throw new TypeError(this + " cannot be reinitialized");
	}
	if (iterable != null) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(this, '__weakMapData__', d('c', '$weakMap$' + genId()));
	if (!iterable) return;
	forOf(iterable, function (val) {
		value(val);
		this.set(val[0], val[1]);
	}, this);
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
	WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
		constructor: d(WeakMapPoly)
	});
}

Object.defineProperties(WeakMapPoly.prototype, {
	clear: d(function () {
		defineProperty(this, '__weakMapData__', d('c', '$weakMap$' + genId()));
	}),
	delete: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			return key[this.__weakMapData__];
		}
	}),
	has: d(function (key) {
		return hasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d('c', value));
		return this;
	}),
	toString: d(function () { return '[object WeakMap]'; })
});
defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d('c', 'WeakMap'));

},{"./is-native-implemented":73,"d":75,"es5-ext/object/set-prototype-of":91,"es5-ext/object/valid-object":95,"es5-ext/object/valid-value":96,"es6-iterator/for-of":102,"es6-iterator/get":103,"es6-symbol":113}],117:[function(require,module,exports){
/*
  Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function () {
    'use strict';

    var estraverse,
        isArray,
        objectKeys;

    estraverse = require('estraverse');

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    objectKeys = Object.keys || function (o) {
        var keys = [], key;
        for (key in o) {
            keys.push(key);
        }
        return keys;
    };

    function isNode(node) {
        if (node == null) {
            return false;
        }
        return typeof node === 'object' && typeof node.type === 'string';
    }

    function isProperty(nodeType, key) {
        return (nodeType === estraverse.Syntax.ObjectExpression || nodeType === estraverse.Syntax.ObjectPattern) && key === 'properties';
    }

    function Visitor(visitor) {
        this.__visitor = visitor;
    }

    /* Default method for visiting children.
     * When you need to call default visiting operation inside custom visiting
     * operation, you can use it with `this.visitChildren(node)`.
     */
    Visitor.prototype.visitChildren = function (node) {
        var type, children, i, iz, j, jz, child;

        if (node == null) {
            return;
        }

        type = node.type || estraverse.Syntax.Property;

        children = estraverse.VisitorKeys[type];
        if (!children) {
            children = objectKeys(node);
        }

        for (i = 0, iz = children.length; i < iz; ++i) {
            child = node[children[i]];
            if (child) {
                if (Array.isArray(child)) {
                    for (j = 0, jz = child.length; j < jz; ++j) {
                        if (child[j]) {
                            if (isNode(child[j]) || isProperty(type, children[i])) {
                                this.visit(child[j]);
                            }
                        }
                    }
                } else if (isNode(child)) {
                    this.visit(child);
                }
            }
        }
    };

    /* Dispatching node. */
    Visitor.prototype.visit = function (node) {
        var type;

        if (node == null) {
            return;
        }

        type = node.type || estraverse.Syntax.Property;
        if (this.__visitor[type]) {
            this.__visitor[type].call(this, node);
            return;
        }
        this.visitChildren(node);
    };

    exports.version = require('./package.json').version;
    exports.Visitor = Visitor;
    exports.visit = function (node, visitor) {
        var v = new Visitor(visitor);
        v.visit(node);
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./package.json":118,"estraverse":123}],118:[function(require,module,exports){
module.exports={
  "name": "esrecurse",
  "description": "ECMAScript scope analyzer",
  "homepage": "http://github.com/estools/esrecurse",
  "main": "esrecurse.js",
  "version": "1.2.0",
  "engines": {
    "node": ">=0.10.0"
  },
  "maintainers": [
    {
      "name": "constellation",
      "email": "utatane.tea@gmail.com"
    }
  ],
  "repository": {
    "type": "git",
    "url": "http://github.com/estools/esrecurse.git"
  },
  "dependencies": {
    "estraverse": ">=1.9.0"
  },
  "devDependencies": {
    "chai": "~1.10.0",
    "coffee-script": "~1.8.0",
    "esprima": "~1.2.2",
    "gulp": "~3.8.10",
    "gulp-eslint": "^0.2.0",
    "gulp-mocha": "~2.0.0",
    "jsdoc": "~3.3.0-alpha10",
    "minimist": "^1.1.0"
  },
  "licenses": [
    {
      "type": "BSD",
      "url": "http://github.com/estools/esrecurse/raw/master/LICENSE.BSD"
    }
  ],
  "scripts": {
    "test": "gulp travis",
    "unit-test": "gulp test",
    "lint": "gulp lint"
  },
  "gitHead": "9b363cee6d6b6b29b5236f4b98066ba0735fe9e4",
  "bugs": {
    "url": "https://github.com/estools/esrecurse/issues"
  },
  "_id": "esrecurse@1.2.0",
  "_shasum": "25e3b3ab76ad8a1da2d38e9393fd76b8456a706f",
  "_from": "esrecurse@^1.2.0",
  "_npmVersion": "2.0.0-alpha-5",
  "_npmUser": {
    "name": "constellation",
    "email": "utatane.tea@gmail.com"
  },
  "dist": {
    "shasum": "25e3b3ab76ad8a1da2d38e9393fd76b8456a706f",
    "tarball": "http://registry.npmjs.org/esrecurse/-/esrecurse-1.2.0.tgz"
  },
  "directories": {},
  "_resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-1.2.0.tgz",
  "readme": "ERROR: No README data found!"
}

},{}],119:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = extend;
function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

},{}],120:[function(require,module,exports){
module.exports={
  "name": "escope",
  "description": "ECMAScript scope analyzer",
  "homepage": "http://github.com/estools/escope.html",
  "main": "escope.js",
  "version": "2.0.6",
  "engines": {
    "node": ">=0.4.0"
  },
  "maintainers": [
    {
      "name": "constellation",
      "email": "utatane.tea@gmail.com"
    }
  ],
  "repository": {
    "type": "git",
    "url": "http://github.com/estools/escope.git"
  },
  "dependencies": {
    "es6-map": "^0.1.1",
    "es6-weak-map": "^0.1.2",
    "esrecurse": "^1.2.0",
    "estraverse": ">=1.9.0",
    "util-extend": "^1.0.1"
  },
  "devDependencies": {
    "browserify": "^7.0.0",
    "chai": "~1.10.0",
    "coffee-script": "~1.8.0",
    "esprima": "~1.2.2",
    "gulp": "~3.8.10",
    "gulp-eslint": "^0.2.0",
    "gulp-mocha": "~2.0.0",
    "jsdoc": "~3.3.0-alpha10",
    "minimist": "^1.1.0",
    "vinyl-source-stream": "^1.0.0"
  },
  "licenses": [
    {
      "type": "BSD",
      "url": "http://github.com/estools/escope/raw/master/LICENSE.BSD"
    }
  ],
  "scripts": {
    "test": "gulp travis",
    "unit-test": "gulp test",
    "lint": "gulp lint",
    "jsdoc": "jsdoc escope.js README.md"
  },
  "gitHead": "dc4b85631e98011268fc426dd824c74e353d5b48",
  "bugs": {
    "url": "https://github.com/estools/escope/issues"
  },
  "_id": "escope@2.0.6",
  "_shasum": "c1bac24870605bb384ba073dce0417c9305eddeb",
  "_from": "escope@2.0.6",
  "_npmVersion": "1.4.28",
  "_npmUser": {
    "name": "constellation",
    "email": "utatane.tea@gmail.com"
  },
  "dist": {
    "shasum": "c1bac24870605bb384ba073dce0417c9305eddeb",
    "tarball": "http://registry.npmjs.org/escope/-/escope-2.0.6.tgz"
  },
  "directories": {},
  "_resolved": "https://registry.npmjs.org/escope/-/escope-2.0.6.tgz",
  "readme": "ERROR: No README data found!"
}

},{}],121:[function(require,module,exports){
var estraverse = module.exports = require('estraverse');

var VisitorKeys = require('./keys');

for (var nodeType in VisitorKeys) {
	estraverse.Syntax[nodeType] = nodeType;

	var keys = VisitorKeys[nodeType];

	if (keys) {
		estraverse.VisitorKeys[nodeType] = keys;
	}
}
},{"./keys":122,"estraverse":123}],122:[function(require,module,exports){
var unprefixedKeys = {
	Identifier: [],
	NamespacedName: ['namespace', 'name'],
	MemberExpression: ['object', 'property'],
	EmptyExpression: [],
	ExpressionContainer: ['expression'],
	Element: ['openingElement', 'closingElement', 'children'],
	ClosingElement: ['name'],
	OpeningElement: ['name', 'attributes'],
	Attribute: ['name', 'value'],
	Text: null,
	SpreadAttribute: ['argument']
};

var flowKeys = {
	Type: [],
	AnyTypeAnnotation: [],
	VoidTypeAnnotation: [],
	NumberTypeAnnotation: [],
	StringTypeAnnotation: [],
	StringLiteralTypeAnnotation: ["value", "raw"],
	BooleanTypeAnnotation: [],
	TypeAnnotation: ["typeAnnotation"],
	NullableTypeAnnotation: ["typeAnnotation"],
	FunctionTypeAnnotation: ["params", "returnType", "rest", "typeParameters"],
	FunctionTypeParam: ["name", "typeAnnotation", "optional"],
	ObjectTypeAnnotation: ["properties"],
	ObjectTypeProperty: ["key", "value", "optional"],
	ObjectTypeIndexer: ["id", "key", "value"],
	ObjectTypeCallProperty: ["value"],
	QualifiedTypeIdentifier: ["qualification", "id"],
	GenericTypeAnnotation: ["id", "typeParameters"],
	MemberTypeAnnotation: ["object", "property"],
	UnionTypeAnnotation: ["types"],
	IntersectionTypeAnnotation: ["types"],
	TypeofTypeAnnotation: ["argument"],
	TypeParameterDeclaration: ["params"],
	TypeParameterInstantiation: ["params"],
	ClassProperty: ["key", "typeAnnotation"],
	ClassImplements: [],
	InterfaceDeclaration: ["id", "body", "extends"],
	InterfaceExtends: ["id"],
	TypeAlias: ["id", "typeParameters", "right"],
	TupleTypeAnnotation: ["types"],
	DeclareVariable: ["id"],
	DeclareFunction: ["id"],
	DeclareClass: ["id"],
	DeclareModule: ["id", "body"]
};

for (var key in unprefixedKeys) {
	exports['XJS' + key] = exports['JSX' + key] = unprefixedKeys[key];
}

for (var key in flowKeys) {
	exports[key] = flowKeys[key];
}
},{}],123:[function(require,module,exports){
/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*jslint vars:false, bitwise:true*/
/*jshint indent:4*/
/*global exports:true*/
(function clone(exports) {
    'use strict';

    var Syntax,
        isArray,
        VisitorOption,
        VisitorKeys,
        objectCreate,
        objectKeys,
        BREAK,
        SKIP,
        REMOVE;

    function ignoreJSHintError() { }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function deepCopy(obj) {
        var ret = {}, key, val;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object' && val !== null) {
                    ret[key] = deepCopy(val);
                } else {
                    ret[key] = val;
                }
            }
        }
        return ret;
    }

    function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    ignoreJSHintError(shallowCopy);

    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License

    function upperBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                len = diff;
            } else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }

    function lowerBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                i = current + 1;
                len -= diff + 1;
            } else {
                len = diff;
            }
        }
        return i;
    }
    ignoreJSHintError(lowerBound);

    objectCreate = Object.create || (function () {
        function F() { }

        return function (o) {
            F.prototype = o;
            return new F();
        };
    })();

    objectKeys = Object.keys || function (o) {
        var keys = [], key;
        for (key in o) {
            keys.push(key);
        }
        return keys;
    };

    function extend(to, from) {
        var keys = objectKeys(from), key, i, len;
        for (i = 0, len = keys.length; i < len; i += 1) {
            key = keys[i];
            to[key] = from[key];
        }
        return to;
    }

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression', // CAUTION: It's deferred to ES7.
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: 'ComprehensionExpression',  // CAUTION: It's deferred to ES7.
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',  // CAUTION: It's deferred to ES7.
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MethodDefinition: 'MethodDefinition',
        ModuleSpecifier: 'ModuleSpecifier',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        AssignmentPattern: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'defaults', 'rest', 'body'],
        AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'superClass', 'body'],
        ClassExpression: ['id', 'superClass', 'body'],
        ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExportAllDeclaration: ['source'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: ['declaration', 'specifiers', 'source'],
        ExportSpecifier: ['exported', 'local'],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'defaults', 'rest', 'body'],
        FunctionExpression: ['id', 'params', 'defaults', 'rest', 'body'],
        GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        ImportDeclaration: ['specifiers', 'source'],
        ImportDefaultSpecifier: ['local'],
        ImportNamespaceSpecifier: ['local'],
        ImportSpecifier: ['imported', 'local'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        MethodDefinition: ['key', 'value'],
        ModuleSpecifier: [],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        RestElement: [ 'argument' ],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SpreadElement: ['argument'],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        TaggedTemplateExpression: ['tag', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handlers', 'handler', 'guardedHandlers', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    // unique id
    BREAK = {};
    SKIP = {};
    REMOVE = {};

    VisitorOption = {
        Break: BREAK,
        Skip: SKIP,
        Remove: REMOVE
    };

    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }

    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };

    Reference.prototype.remove = function remove() {
        if (isArray(this.parent)) {
            this.parent.splice(this.key, 1);
            return true;
        } else {
            this.replace(null);
            return false;
        }
    };

    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }

    function Controller() { }

    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;

        function addToPath(result, path) {
            if (isArray(path)) {
                for (j = 0, jz = path.length; j < jz; ++j) {
                    result.push(path[j]);
                }
            } else {
                result.push(path);
            }
        }

        // root node
        if (!this.__current.path) {
            return null;
        }

        // first node is sentinel, second node is root element
        result = [];
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };

    // API:
    // return type of current node
    Controller.prototype.type = function () {
        var node = this.current();
        return node.type || this.__current.wrap;
    };

    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;

        // first node is sentinel
        result = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
        }

        return result;
    };

    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };

    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;

        result = undefined;

        previous  = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        }
        this.__current = previous;

        return result;
    };

    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };

    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function () {
        this.notify(SKIP);
    };

    // API:
    // break traversals
    Controller.prototype['break'] = function () {
        this.notify(BREAK);
    };

    // API:
    // remove node
    Controller.prototype.remove = function () {
        this.notify(REMOVE);
    };

    Controller.prototype.__initialize = function(root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
        this.__fallback = visitor.fallback === 'iteration';
        this.__keys = VisitorKeys;
        if (visitor.keys) {
            this.__keys = extend(objectCreate(this.__keys), visitor.keys);
        }
    };

    function isNode(node) {
        if (node == null) {
            return false;
        }
        return typeof node === 'object' && typeof node.type === 'string';
    }

    function isProperty(nodeType, key) {
        return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
    }

    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist,
            leavelist,
            element,
            node,
            nodeType,
            ret,
            key,
            current,
            current2,
            candidates,
            candidate,
            sentinel;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                ret = this.__execute(visitor.leave, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {

                ret = this.__execute(visitor.enter, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (this.__state === SKIP || ret === SKIP) {
                    continue;
                }

                node = element.node;
                nodeType = element.wrap || node.type;
                candidates = this.__keys[nodeType];
                if (!candidates) {
                    if (this.__fallback) {
                        candidates = objectKeys(node);
                    } else {
                        throw new Error('Unknown node type ' + nodeType + '.');
                    }
                }

                current = candidates.length;
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (isArray(candidate)) {
                        current2 = candidate.length;
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue;
                            }
                            if (isProperty(nodeType, candidates[current])) {
                                element = new Element(candidate[current2], [key, current2], 'Property', null);
                            } else if (isNode(candidate[current2])) {
                                element = new Element(candidate[current2], [key, current2], null, null);
                            } else {
                                continue;
                            }
                            worklist.push(element);
                        }
                    } else if (isNode(candidate)) {
                        worklist.push(new Element(candidate, key, null, null));
                    }
                }
            }
        }
    };

    Controller.prototype.replace = function replace(root, visitor) {
        function removeElem(element) {
            var i,
                key,
                nextElem,
                parent;

            if (element.ref.remove()) {
                // When the reference is an element of an array.
                key = element.ref.key;
                parent = element.ref.parent;

                // If removed from array, then decrease following items' keys.
                i = worklist.length;
                while (i--) {
                    nextElem = worklist[i];
                    if (nextElem.ref && nextElem.ref.parent === parent) {
                        if  (nextElem.ref.key < key) {
                            break;
                        }
                        --nextElem.ref.key;
                    }
                }
            }
        }

        var worklist,
            leavelist,
            node,
            nodeType,
            target,
            element,
            current,
            current2,
            candidates,
            candidate,
            sentinel,
            outer,
            key;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                target = this.__execute(visitor.leave, element);

                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                    // replace
                    element.ref.replace(target);
                }

                if (this.__state === REMOVE || target === REMOVE) {
                    removeElem(element);
                }

                if (this.__state === BREAK || target === BREAK) {
                    return outer.root;
                }
                continue;
            }

            target = this.__execute(visitor.enter, element);

            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }

            if (this.__state === REMOVE || target === REMOVE) {
                removeElem(element);
                element.node = null;
            }

            if (this.__state === BREAK || target === BREAK) {
                return outer.root;
            }

            // node may be null
            node = element.node;
            if (!node) {
                continue;
            }

            worklist.push(sentinel);
            leavelist.push(element);

            if (this.__state === SKIP || target === SKIP) {
                continue;
            }

            nodeType = element.wrap || node.type;
            candidates = this.__keys[nodeType];
            if (!candidates) {
                if (this.__fallback) {
                    candidates = objectKeys(node);
                } else {
                    throw new Error('Unknown node type ' + nodeType + '.');
                }
            }

            current = candidates.length;
            while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                    continue;
                }

                if (isArray(candidate)) {
                    current2 = candidate.length;
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue;
                        }
                        if (isProperty(nodeType, candidates[current])) {
                            element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
                        } else if (isNode(candidate[current2])) {
                            element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
                        } else {
                            continue;
                        }
                        worklist.push(element);
                    }
                } else if (isNode(candidate)) {
                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                }
            }
        }

        return outer.root;
    };

    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }

    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }

    function extendCommentRange(comment, tokens) {
        var target;

        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });

        comment.extendedRange = [comment.range[0], comment.range[1]];

        if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
        }

        target -= 1;
        if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
        }

        return comment;
    }

    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [], comment, len, i, cursor;

        if (!tree.range) {
            throw new Error('attachComments needs range information');
        }

        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for (i = 0, len = providedComments.length; i < len; i += 1) {
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [0, tree.range[0]];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }

        for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        }

        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) {
                        break;
                    }

                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) {
                            node.leadingComments = [];
                        }
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        cursor = 0;
        traverse(tree, {
            leave: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) {
                        break;
                    }

                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) {
                            node.trailingComments = [];
                        }
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        return tree;
    }

    exports.version = require('./package.json').version;
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
    exports.cloneEnvironment = function () { return clone({}); };

    return exports;
}(exports));
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./package.json":124}],124:[function(require,module,exports){
module.exports={
  "name": "estraverse",
  "description": "ECMAScript JS AST traversal functions",
  "homepage": "https://github.com/estools/estraverse",
  "main": "estraverse.js",
  "version": "2.0.0",
  "engines": {
    "node": ">=0.10.0"
  },
  "maintainers": [
    {
      "name": "constellation",
      "email": "utatane.tea@gmail.com"
    }
  ],
  "repository": {
    "type": "git",
    "url": "http://github.com/estools/estraverse.git"
  },
  "devDependencies": {
    "chai": "^2.1.1",
    "coffee-script": "^1.8.0",
    "espree": "^1.11.0",
    "gulp": "^3.8.10",
    "gulp-bump": "^0.2.2",
    "gulp-filter": "^2.0.0",
    "gulp-git": "^1.0.1",
    "gulp-tag-version": "^1.2.1",
    "jshint": "^2.5.6",
    "mocha": "^2.1.0"
  },
  "licenses": [
    {
      "type": "BSD",
      "url": "http://github.com/estools/estraverse/raw/master/LICENSE.BSD"
    }
  ],
  "scripts": {
    "test": "npm run-script lint && npm run-script unit-test",
    "lint": "jshint estraverse.js",
    "unit-test": "mocha --compilers coffee:coffee-script/register"
  },
  "gitHead": "d8bc726f126817cc03c7a4e751528edb19db0ffb",
  "bugs": {
    "url": "https://github.com/estools/estraverse/issues"
  },
  "_id": "estraverse@2.0.0",
  "_shasum": "5ae46963243600206674ccb24a09e16674fcdca1",
  "_from": "estraverse@latest",
  "_npmVersion": "2.0.0-alpha-5",
  "_npmUser": {
    "name": "constellation",
    "email": "utatane.tea@gmail.com"
  },
  "dist": {
    "shasum": "5ae46963243600206674ccb24a09e16674fcdca1",
    "tarball": "http://registry.npmjs.org/estraverse/-/estraverse-2.0.0.tgz"
  },
  "directories": {},
  "_resolved": "https://registry.npmjs.org/estraverse/-/estraverse-2.0.0.tgz",
  "readme": "ERROR: No README data found!"
}

},{}],125:[function(require,module,exports){
module.exports={
	"builtin": {
		"Array": false,
		"ArrayBuffer": false,
		"Boolean": false,
		"constructor": false,
		"Date": false,
		"decodeURI": false,
		"decodeURIComponent": false,
		"encodeURI": false,
		"encodeURIComponent": false,
		"Error": false,
		"eval": false,
		"EvalError": false,
		"Float32Array": false,
		"Float64Array": false,
		"Function": false,
		"hasOwnProperty": false,
		"Infinity": false,
		"Int16Array": false,
		"Int32Array": false,
		"Int8Array": false,
		"isFinite": false,
		"isNaN": false,
		"isPrototypeOf": false,
		"JSON": false,
		"Map": false,
		"Math": false,
		"NaN": false,
		"Number": false,
		"Object": false,
		"parseFloat": false,
		"parseInt": false,
		"Promise": false,
		"propertyIsEnumerable": false,
		"Proxy": false,
		"RangeError": false,
		"ReferenceError": false,
		"Reflect": false,
		"RegExp": false,
		"Set": false,
		"String": false,
		"Symbol": false,
		"SyntaxError": false,
		"System": false,
		"toLocaleString": false,
		"toString": false,
		"TypeError": false,
		"Uint16Array": false,
		"Uint32Array": false,
		"Uint8Array": false,
		"Uint8ClampedArray": false,
		"undefined": false,
		"URIError": false,
		"valueOf": false,
		"WeakMap": false,
		"WeakSet": false
	},
	"nonstandard": {
		"escape": false,
		"unescape": false
	},
	"browser": {
		"addEventListener": false,
		"alert": false,
		"applicationCache": false,
		"atob": false,
		"Audio": false,
		"AudioProcessingEvent": false,
		"BeforeUnloadEvent": false,
		"Blob": false,
		"blur": false,
		"btoa": false,
		"cancelAnimationFrame": false,
		"CanvasGradient": false,
		"CanvasPattern": false,
		"CanvasRenderingContext2D": false,
		"clearInterval": false,
		"clearTimeout": false,
		"close": false,
		"closed": false,
		"CloseEvent": false,
		"Comment": false,
		"CompositionEvent": false,
		"confirm": false,
		"console": false,
		"crypto": false,
		"CSS": false,
		"CustomEvent": false,
		"DataView": false,
		"Debug": false,
		"defaultStatus": false,
		"devicePixelRatio": false,
		"dispatchEvent": false,
		"document": false,
		"Document": false,
		"DocumentFragment": false,
		"DOMParser": false,
		"DragEvent": false,
		"Element": false,
		"ElementTimeControl": false,
		"ErrorEvent": false,
		"event": false,
		"Event": false,
		"FileReader": false,
		"find": false,
		"focus": false,
		"FocusEvent": false,
		"FormData": false,
		"frameElement": false,
		"frames": false,
		"GamepadEvent": false,
		"getComputedStyle": false,
		"getSelection": false,
		"HashChangeEvent": false,
		"history": false,
		"HTMLAnchorElement": false,
		"HTMLBaseElement": false,
		"HTMLBlockquoteElement": false,
		"HTMLBodyElement": false,
		"HTMLBRElement": false,
		"HTMLButtonElement": false,
		"HTMLCanvasElement": false,
		"HTMLDirectoryElement": false,
		"HTMLDivElement": false,
		"HTMLDListElement": false,
		"HTMLElement": false,
		"HTMLFieldSetElement": false,
		"HTMLFontElement": false,
		"HTMLFormElement": false,
		"HTMLFrameElement": false,
		"HTMLFrameSetElement": false,
		"HTMLHeadElement": false,
		"HTMLHeadingElement": false,
		"HTMLHRElement": false,
		"HTMLHtmlElement": false,
		"HTMLIFrameElement": false,
		"HTMLImageElement": false,
		"HTMLInputElement": false,
		"HTMLIsIndexElement": false,
		"HTMLLabelElement": false,
		"HTMLLayerElement": false,
		"HTMLLegendElement": false,
		"HTMLLIElement": false,
		"HTMLLinkElement": false,
		"HTMLMapElement": false,
		"HTMLMenuElement": false,
		"HTMLMetaElement": false,
		"HTMLModElement": false,
		"HTMLObjectElement": false,
		"HTMLOListElement": false,
		"HTMLOptGroupElement": false,
		"HTMLOptionElement": false,
		"HTMLParagraphElement": false,
		"HTMLParamElement": false,
		"HTMLPreElement": false,
		"HTMLQuoteElement": false,
		"HTMLScriptElement": false,
		"HTMLSelectElement": false,
		"HTMLStyleElement": false,
		"HTMLTableCaptionElement": false,
		"HTMLTableCellElement": false,
		"HTMLTableColElement": false,
		"HTMLTableElement": false,
		"HTMLTableRowElement": false,
		"HTMLTableSectionElement": false,
		"HTMLTextAreaElement": false,
		"HTMLTitleElement": false,
		"HTMLUListElement": false,
		"HTMLVideoElement": false,
		"IDBCursor": false,
		"IDBCursorWithValue": false,
		"IDBDatabase": false,
		"IDBEnvironment": false,
		"IDBFactory": false,
		"IDBIndex": false,
		"IDBKeyRange": false,
		"IDBObjectStore": false,
		"IDBOpenDBRequest": false,
		"IDBRequest": false,
		"IDBTransaction": false,
		"IDBVersionChangeEvent": false,
		"Image": false,
		"indexedDB": false,
		"innerHeight": false,
		"innerWidth": false,
		"InputEvent": false,
		"Intl": false,
		"KeyboardEvent": false,
		"length": false,
		"localStorage": false,
		"location": false,
		"matchMedia": false,
		"MessageChannel": false,
		"MessageEvent": false,
		"MessagePort": false,
		"MouseEvent": false,
		"moveBy": false,
		"moveTo": false,
		"MutationObserver": false,
		"name": false,
		"navigator": false,
		"Node": false,
		"NodeFilter": false,
		"NodeList": false,
		"Notification": false,
		"OfflineAudioCompletionEvent": false,
		"onbeforeunload": true,
		"onblur": true,
		"onerror": true,
		"onfocus": true,
		"onload": true,
		"onresize": true,
		"onunload": true,
		"open": false,
		"openDatabase": false,
		"opener": false,
		"opera": false,
		"Option": false,
		"outerHeight": false,
		"outerWidth": false,
		"PageTransitionEvent": false,
		"pageXOffset": false,
		"pageYOffset": false,
		"parent": false,
		"PopStateEvent": false,
		"postMessage": false,
		"print": false,
		"ProgressEvent": false,
		"prompt": false,
		"Range": false,
		"removeEventListener": false,
		"requestAnimationFrame": false,
		"resizeBy": false,
		"resizeTo": false,
		"screen": false,
		"screenX": false,
		"screenY": false,
		"scroll": false,
		"scrollbars": false,
		"scrollBy": false,
		"scrollTo": false,
		"scrollX": false,
		"scrollY": false,
		"self": false,
		"sessionStorage": false,
		"setInterval": false,
		"setTimeout": false,
		"SharedWorker": false,
		"showModalDialog": false,
		"status": false,
		"stop": false,
		"StorageEvent": false,
		"SVGAElement": false,
		"SVGAltGlyphDefElement": false,
		"SVGAltGlyphElement": false,
		"SVGAltGlyphItemElement": false,
		"SVGAngle": false,
		"SVGAnimateColorElement": false,
		"SVGAnimatedAngle": false,
		"SVGAnimatedBoolean": false,
		"SVGAnimatedEnumeration": false,
		"SVGAnimatedInteger": false,
		"SVGAnimatedLength": false,
		"SVGAnimatedLengthList": false,
		"SVGAnimatedNumber": false,
		"SVGAnimatedNumberList": false,
		"SVGAnimatedPathData": false,
		"SVGAnimatedPoints": false,
		"SVGAnimatedPreserveAspectRatio": false,
		"SVGAnimatedRect": false,
		"SVGAnimatedString": false,
		"SVGAnimatedTransformList": false,
		"SVGAnimateElement": false,
		"SVGAnimateMotionElement": false,
		"SVGAnimateTransformElement": false,
		"SVGAnimationElement": false,
		"SVGCircleElement": false,
		"SVGClipPathElement": false,
		"SVGColor": false,
		"SVGColorProfileElement": false,
		"SVGColorProfileRule": false,
		"SVGComponentTransferFunctionElement": false,
		"SVGCSSRule": false,
		"SVGCursorElement": false,
		"SVGDefsElement": false,
		"SVGDescElement": false,
		"SVGDocument": false,
		"SVGElement": false,
		"SVGElementInstance": false,
		"SVGElementInstanceList": false,
		"SVGEllipseElement": false,
		"SVGEvent": false,
		"SVGExternalResourcesRequired": false,
		"SVGFEBlendElement": false,
		"SVGFEColorMatrixElement": false,
		"SVGFEComponentTransferElement": false,
		"SVGFECompositeElement": false,
		"SVGFEConvolveMatrixElement": false,
		"SVGFEDiffuseLightingElement": false,
		"SVGFEDisplacementMapElement": false,
		"SVGFEDistantLightElement": false,
		"SVGFEFloodElement": false,
		"SVGFEFuncAElement": false,
		"SVGFEFuncBElement": false,
		"SVGFEFuncGElement": false,
		"SVGFEFuncRElement": false,
		"SVGFEGaussianBlurElement": false,
		"SVGFEImageElement": false,
		"SVGFEMergeElement": false,
		"SVGFEMergeNodeElement": false,
		"SVGFEMorphologyElement": false,
		"SVGFEOffsetElement": false,
		"SVGFEPointLightElement": false,
		"SVGFESpecularLightingElement": false,
		"SVGFESpotLightElement": false,
		"SVGFETileElement": false,
		"SVGFETurbulenceElement": false,
		"SVGFilterElement": false,
		"SVGFilterPrimitiveStandardAttributes": false,
		"SVGFitToViewBox": false,
		"SVGFontElement": false,
		"SVGFontFaceElement": false,
		"SVGFontFaceFormatElement": false,
		"SVGFontFaceNameElement": false,
		"SVGFontFaceSrcElement": false,
		"SVGFontFaceUriElement": false,
		"SVGForeignObjectElement": false,
		"SVGGElement": false,
		"SVGGlyphElement": false,
		"SVGGlyphRefElement": false,
		"SVGGradientElement": false,
		"SVGHKernElement": false,
		"SVGICCColor": false,
		"SVGImageElement": false,
		"SVGLangSpace": false,
		"SVGLength": false,
		"SVGLengthList": false,
		"SVGLinearGradientElement": false,
		"SVGLineElement": false,
		"SVGLocatable": false,
		"SVGMarkerElement": false,
		"SVGMaskElement": false,
		"SVGMatrix": false,
		"SVGMetadataElement": false,
		"SVGMissingGlyphElement": false,
		"SVGMPathElement": false,
		"SVGNumber": false,
		"SVGNumberList": false,
		"SVGPaint": false,
		"SVGPathElement": false,
		"SVGPathSeg": false,
		"SVGPathSegArcAbs": false,
		"SVGPathSegArcRel": false,
		"SVGPathSegClosePath": false,
		"SVGPathSegCurvetoCubicAbs": false,
		"SVGPathSegCurvetoCubicRel": false,
		"SVGPathSegCurvetoCubicSmoothAbs": false,
		"SVGPathSegCurvetoCubicSmoothRel": false,
		"SVGPathSegCurvetoQuadraticAbs": false,
		"SVGPathSegCurvetoQuadraticRel": false,
		"SVGPathSegCurvetoQuadraticSmoothAbs": false,
		"SVGPathSegCurvetoQuadraticSmoothRel": false,
		"SVGPathSegLinetoAbs": false,
		"SVGPathSegLinetoHorizontalAbs": false,
		"SVGPathSegLinetoHorizontalRel": false,
		"SVGPathSegLinetoRel": false,
		"SVGPathSegLinetoVerticalAbs": false,
		"SVGPathSegLinetoVerticalRel": false,
		"SVGPathSegList": false,
		"SVGPathSegMovetoAbs": false,
		"SVGPathSegMovetoRel": false,
		"SVGPatternElement": false,
		"SVGPoint": false,
		"SVGPointList": false,
		"SVGPolygonElement": false,
		"SVGPolylineElement": false,
		"SVGPreserveAspectRatio": false,
		"SVGRadialGradientElement": false,
		"SVGRect": false,
		"SVGRectElement": false,
		"SVGRenderingIntent": false,
		"SVGScriptElement": false,
		"SVGSetElement": false,
		"SVGStopElement": false,
		"SVGStringList": false,
		"SVGStylable": false,
		"SVGStyleElement": false,
		"SVGSVGElement": false,
		"SVGSwitchElement": false,
		"SVGSymbolElement": false,
		"SVGTests": false,
		"SVGTextContentElement": false,
		"SVGTextElement": false,
		"SVGTextPathElement": false,
		"SVGTextPositioningElement": false,
		"SVGTitleElement": false,
		"SVGTransform": false,
		"SVGTransformable": false,
		"SVGTransformList": false,
		"SVGTRefElement": false,
		"SVGTSpanElement": false,
		"SVGUnitTypes": false,
		"SVGURIReference": false,
		"SVGUseElement": false,
		"SVGViewElement": false,
		"SVGViewSpec": false,
		"SVGVKernElement": false,
		"SVGZoomAndPan": false,
		"Text": false,
		"TextDecoder": false,
		"TextEncoder": false,
		"TimeEvent": false,
		"top": false,
		"TouchEvent": false,
		"UIEvent": false,
		"URL": false,
		"WebGLActiveInfo": false,
		"WebGLBuffer": false,
		"WebGLContextEvent": false,
		"WebGLFramebuffer": false,
		"WebGLProgram": false,
		"WebGLRenderbuffer": false,
		"WebGLRenderingContext": false,
		"WebGLShader": false,
		"WebGLShaderPrecisionFormat": false,
		"WebGLTexture": false,
		"WebGLUniformLocation": false,
		"WebSocket": false,
		"WheelEvent": false,
		"window": false,
		"Window": false,
		"Worker": false,
		"XDomainRequest": false,
		"XMLHttpRequest": false,
		"XMLSerializer": false,
		"XPathEvaluator": false,
		"XPathException": false,
		"XPathExpression": false,
		"XPathNamespace": false,
		"XPathNSResolver": false,
		"XPathResult": false
	},
	"worker": {
		"importScripts": true,
		"postMessage": true,
		"self": true
	},
	"node": {
		"__dirname": false,
		"__filename": false,
		"arguments": false,
		"Buffer": false,
		"clearImmediate": false,
		"clearInterval": false,
		"clearTimeout": false,
		"console": false,
		"DataView": false,
		"exports": true,
		"GLOBAL": false,
		"global": false,
		"module": false,
		"process": false,
		"require": false,
		"setImmediate": false,
		"setInterval": false,
		"setTimeout": false
	},
	"amd": {
		"define": false,
		"require": false
	},
	"mocha": {
		"after": false,
		"afterEach": false,
		"before": false,
		"beforeEach": false,
		"context": false,
		"describe": false,
		"it": false,
		"setup": false,
		"specify": false,
		"suite": false,
		"suiteSetup": false,
		"suiteTeardown": false,
		"teardown": false,
		"test": false,
		"xcontext": false,
		"xdescribe": false,
		"xit": false,
		"xspecify": false
	},
	"jasmine": {
		"afterAll": false,
		"afterEach": false,
		"beforeAll": false,
		"beforeEach": false,
		"describe": false,
		"expect": false,
		"fail": false,
		"fdescribe": false,
		"fit": false,
		"it": false,
		"jasmine": false,
		"pending": false,
		"runs": false,
		"spyOn": false,
		"waits": false,
		"waitsFor": false,
		"xdescribe": false,
		"xit": false
	},
	"qunit": {
		"asyncTest": false,
		"deepEqual": false,
		"equal": false,
		"expect": false,
		"module": false,
		"notDeepEqual": false,
		"notEqual": false,
		"notPropEqual": false,
		"notStrictEqual": false,
		"ok": false,
		"propEqual": false,
		"QUnit": false,
		"raises": false,
		"start": false,
		"stop": false,
		"strictEqual": false,
		"test": false,
		"throws": false
	},
	"phantomjs": {
		"console": true,
		"exports": true,
		"phantom": true,
		"require": true,
		"WebPage": true
	},
	"couch": {
		"emit": false,
		"exports": false,
		"getRow": false,
		"log": false,
		"module": false,
		"provides": false,
		"require": false,
		"respond": false,
		"send": false,
		"start": false,
		"sum": false
	},
	"rhino": {
		"defineClass": false,
		"deserialize": false,
		"gc": false,
		"help": false,
		"importClass": false,
		"importPackage": false,
		"java": false,
		"load": false,
		"loadClass": false,
		"Packages": false,
		"print": false,
		"quit": false,
		"readFile": false,
		"readUrl": false,
		"runCommand": false,
		"seal": false,
		"serialize": false,
		"spawn": false,
		"sync": false,
		"toint32": false,
		"version": false
	},
	"wsh": {
		"ActiveXObject": true,
		"Enumerator": true,
		"GetObject": true,
		"ScriptEngine": true,
		"ScriptEngineBuildVersion": true,
		"ScriptEngineMajorVersion": true,
		"ScriptEngineMinorVersion": true,
		"VBArray": true,
		"WScript": true,
		"WSH": true,
		"XDomainRequest": true
	},
	"jquery": {
		"$": false,
		"jQuery": false
	},
	"yui": {
		"Y": false,
		"YUI": false,
		"YUI_config": false
	},
	"shelljs": {
		"cat": false,
		"cd": false,
		"chmod": false,
		"config": false,
		"cp": false,
		"dirs": false,
		"echo": false,
		"env": false,
		"error": false,
		"exec": false,
		"exit": false,
		"find": false,
		"grep": false,
		"ls": false,
		"mkdir": false,
		"mv": false,
		"popd": false,
		"pushd": false,
		"pwd": false,
		"rm": false,
		"sed": false,
		"target": false,
		"tempdir": false,
		"test": false,
		"which": false
	},
	"prototypejs": {
		"$": false,
		"$$": false,
		"$A": false,
		"$break": false,
		"$continue": false,
		"$F": false,
		"$H": false,
		"$R": false,
		"$w": false,
		"Abstract": false,
		"Ajax": false,
		"Autocompleter": false,
		"Builder": false,
		"Class": false,
		"Control": false,
		"Draggable": false,
		"Draggables": false,
		"Droppables": false,
		"Effect": false,
		"Element": false,
		"Enumerable": false,
		"Event": false,
		"Field": false,
		"Form": false,
		"Hash": false,
		"Insertion": false,
		"ObjectRange": false,
		"PeriodicalExecuter": false,
		"Position": false,
		"Prototype": false,
		"Scriptaculous": false,
		"Selector": false,
		"Sortable": false,
		"SortableObserver": false,
		"Sound": false,
		"Template": false,
		"Toggle": false,
		"Try": false
	},
	"meteor": {
		"_": false,
		"$": false,
		"Accounts": false,
		"App": false,
		"Assets": false,
		"Blaze": false,
		"check": false,
		"Cordova": false,
		"DDP": false,
		"DDPServer": false,
		"Deps": false,
		"EJSON": false,
		"Email": false,
		"HTTP": false,
		"Log": false,
		"Match": false,
		"Meteor": false,
		"Mongo": false,
		"MongoInternals": false,
		"Npm": false,
		"Package": false,
		"Plugin": false,
		"process": false,
		"Random": false,
		"ReactiveDict": false,
		"ReactiveVar": false,
		"Router": false,
		"Session": false,
		"share": false,
		"Spacebars": false,
		"Template": false,
		"Tinytest": false,
		"Tracker": false,
		"UI": false,
		"Utils": false,
		"WebApp": false,
		"WebAppInternals": false
	}
}

},{}],126:[function(require,module,exports){
module.exports = require('./globals.json');

},{"./globals.json":125}],127:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],128:[function(require,module,exports){
/**
 * @fileoverview Main ESLint object.
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var estraverse = require("estraverse-fb"),
    escope = require("escope"),
    environments = require("../conf/environments"),
    assign = require("object-assign"),
    rules = require("./rules"),
    util = require("./util"),
    RuleContext = require("./rule-context"),
    timing = require("./timing"),
    createTokenStore = require("./token-store.js"),
    EventEmitter = require("events").EventEmitter,
    escapeRegExp = require("escape-string-regexp");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

// Have to modify estraverse until TryStatement.handlers is removed
estraverse.VisitorKeys.TryStatement = ["block", "handlers", "finalizer"];

// TODO: Remove when estraverse is updated
estraverse.Syntax.ExportNamedDeclaration = "ExportNamedDeclaration";
estraverse.Syntax.ExportDefaultDeclaration = "ExportDefaultDeclaration";
estraverse.Syntax.ExportAllDeclaration = "ExportAllDeclaration";
estraverse.Syntax.ExportSpecifier = "ExportSpecifier";
estraverse.VisitorKeys.ExportNamedDeclaration = ["declaration", "specifies", "source"];
estraverse.VisitorKeys.ExportAllDeclaration = ["source"];
estraverse.VisitorKeys.ExportDefaultDeclaration = ["declaration"];
estraverse.VisitorKeys.ExportNamedDeclaration = ["declaration", "specifiers", "source"];
estraverse.VisitorKeys.ExportSpecifier = ["exported", "local"];
/**
 * Parses a list of "name:boolean_value" or/and "name" options divided by comma or
 * whitespace.
 * @param {string} string The string to parse.
 * @returns {Object} Result map object of names and boolean values
 */
function parseBooleanConfig(string) {
    var items = {};
    // Collapse whitespace around : to make parsing easier
    string = string.replace(/\s*:\s*/g, ":");
    // Collapse whitespace around ,
    string = string.replace(/\s*,\s*/g, ",");
    string.split(/\s|,+/).forEach(function(name) {
        if (!name) {
            return;
        }
        var pos = name.indexOf(":"),
            value;
        if (pos !== -1) {
            value = name.substring(pos + 1, name.length);
            name = name.substring(0, pos);
        }

        items[name] = (value === "true");

    });
    return items;
}

/**
 * Parses a JSON-like config.
 * @param {string} string The string to parse.
 * @param {Object} location Start line and column of comments for potential error message.
 * @param {Object[]} messages The messages queue for potential error message.
 * @returns {Object} Result map object
 */
function parseJsonConfig(string, location, messages) {
    var items = {};
    string = string.replace(/([a-zA-Z0-9\-\/]+):/g, "\"$1\":").replace(/(\]|[0-9])\s+(?=")/, "$1,");
    try {
        items = JSON.parse("{" + string + "}");
    } catch(ex) {

        messages.push({
            fatal: true,
            severity: 2,
            message: "Failed to parse JSON from '" + string + "': " + ex.message,
            line: location.start.line,
            column: location.start.column
        });

    }

    return items;
}

/**
 * Parses a config of values separated by comma.
 * @param {string} string The string to parse.
 * @returns {Object} Result map of values and true values
 */
function parseListConfig(string) {
    var items = {};
    // Collapse whitespace around ,
    string = string.replace(/\s*,\s*/g, ",");
    string.split(/,+/).forEach(function(name) {
        name = name.trim();
        if (!name) {
            return;
        }
        items[name] = true;
    });
    return items;
}

/**
 * @param {Scope} scope The scope object to check.
 * @param {string} name The name of the variable to look up.
 * @returns {Variable} The variable object if found or null if not.
 */
function getVariable(scope, name) {
    var variable = null;
    scope.variables.some(function(v) {
        if (v.name === name) {
            variable = v;
            return true;
        } else {
            return false;
        }

    });
    return variable;
}

/**
 * Ensures that variables representing built-in properties of the Global Object,
 * and any globals declared by special block comments, are present in the global
 * scope.
 * @param {ASTNode} program The top node of the AST.
 * @param {Scope} globalScope The global scope.
 * @param {Object} config The existing configuration data.
 * @returns {void}
 */
function addDeclaredGlobals(program, globalScope, config) {
    var declaredGlobals = {},
        explicitGlobals = {},
        builtin = environments.builtin;

    assign(declaredGlobals, builtin);

    Object.keys(config.env).forEach(function (name) {
        if (config.env[name]) {
            var environmentGlobals = environments[name] && environments[name].globals;
            if (environmentGlobals) {
                assign(declaredGlobals, environmentGlobals);
            }
        }
    });

    assign(declaredGlobals, config.globals);
    assign(explicitGlobals, config.astGlobals);

    Object.keys(declaredGlobals).forEach(function(name) {
        var variable = getVariable(globalScope, name);
        if (!variable) {
            variable = new escope.Variable(name, globalScope);
            variable.eslintExplicitGlobal = false;
            globalScope.variables.push(variable);
        }
        variable.writeable = declaredGlobals[name];
    });

    Object.keys(explicitGlobals).forEach(function(name) {
        var variable = getVariable(globalScope, name);
        if (!variable) {
            variable = new escope.Variable(name, globalScope);
            variable.eslintExplicitGlobal = true;
            globalScope.variables.push(variable);
        }
        variable.writeable = explicitGlobals[name];
    });
}

/**
 * Add data to reporting configuration to disable reporting for list of rules
 * starting from start location
 * @param  {Object[]} reportingConfig Current reporting configuration
 * @param  {Object} start Position to start
 * @param  {string[]} rulesToDisable List of rules
 * @returns {void}
 */
function disableReporting(reportingConfig, start, rulesToDisable) {

    if (rulesToDisable.length) {
        rulesToDisable.forEach(function(rule) {
            reportingConfig.push({
                start: start,
                end: null,
                rule: rule
            });
        });
    } else {
        reportingConfig.push({
            start: start,
            end: null,
            rule: null
        });
    }
}

/**
 * Add data to reporting configuration to enable reporting for list of rules
 * starting from start location
 * @param  {Object[]} reportingConfig Current reporting configuration
 * @param  {Object} start Position to start
 * @param  {string[]} rulesToEnable List of rules
 * @returns {void}
 */
function enableReporting(reportingConfig, start, rulesToEnable) {
    var i;

    if (rulesToEnable.length) {
        rulesToEnable.forEach(function(rule) {
            for (i = reportingConfig.length - 1; i >= 0; i--) {
                if (!reportingConfig[i].end && reportingConfig[i].rule === rule ) {
                    reportingConfig[i].end = start;
                    break;
                }
            }
        });
    } else {
        // find all previous disabled locations if they was started as list of rules
        var prevStart;
        for (i = reportingConfig.length - 1; i >= 0; i--) {
            if (prevStart && prevStart !== reportingConfig[i].start) {
                break;
            }

            if (!reportingConfig[i].end) {
                reportingConfig[i].end = start;
                prevStart = reportingConfig[i].start;
            }
        }
    }
}

/**
 * Parses comments in file to extract file-specific config of rules, globals
 * and environments and merges them with global config; also code blocks
 * where reporting is disabled or enabled and merges them with reporting config.
 * @param {ASTNode} ast The top node of the AST.
 * @param {Object} config The existing configuration data.
 * @param {Object[]} reportingConfig The existing reporting configuration data.
 * @param {Object[]} messages The messages queue.
 * @returns {void}
 */
function modifyConfigsFromComments(ast, config, reportingConfig, messages) {

    var commentConfig = {
        astGlobals: {},
        rules: {},
        env: {}
    };
    var commentRules = {};

    ast.comments.forEach(function(comment) {

        var value = comment.value.trim();
        var match = /^(eslint-\w+|eslint-\w+-\w+|eslint|globals?)(\s|$)/.exec(value);

        if (match) {
            value = value.substring(match.index + match[1].length);

            if (comment.type === "Block") {
                switch (match[1]) {
                    case "globals":
                    case "global":
                        util.mixin(commentConfig.astGlobals, parseBooleanConfig(value));
                        break;

                    case "eslint-env":
                        util.mixin(commentConfig.env, parseListConfig(value));
                        break;

                    case "eslint-disable":
                        disableReporting(reportingConfig, comment.loc.start, Object.keys(parseListConfig(value)));
                        break;

                    case "eslint-enable":
                        enableReporting(reportingConfig, comment.loc.start, Object.keys(parseListConfig(value)));
                        break;

                    case "eslint":
                        var items = parseJsonConfig(value, comment.loc, messages);
                        Object.keys(items).forEach(function(name) {
                            var ruleValue = items[name];
                            if (typeof ruleValue === "number" || (Array.isArray(ruleValue) && typeof ruleValue[0] === "number")) {
                                commentRules[name] = ruleValue;
                            }
                        });
                        break;

                    // no default
                }
            } else {
                // comment.type === "Line"
                if (match[1] === "eslint-disable-line") {
                    disableReporting(reportingConfig, { "line": comment.loc.start.line, "column": 0 }, Object.keys(parseListConfig(value)));
                    enableReporting(reportingConfig, comment.loc.end, Object.keys(parseListConfig(value)));
                }
            }
        }
    });

    // apply environment rules before user rules
    Object.keys(commentConfig.env).forEach(function (name) {
        var environmentRules = environments[name] && environments[name].rules;
        if (commentConfig.env[name] && environmentRules) {
            util.mixin(commentConfig.rules, environmentRules);
        }
    });
    util.mixin(commentConfig.rules, commentRules);

    util.mergeConfigs(config, commentConfig);
}

/**
 * Check if message of rule with ruleId should be ignored in location
 * @param  {Object[]} reportingConfig  Collection of ignore records
 * @param  {string} ruleId   Id of rule
 * @param  {Object} location Location of message
 * @returns {boolean}          True if message should be ignored, false otherwise
 */
function isDisabledByReportingConfig(reportingConfig, ruleId, location) {

    for (var i = 0, c = reportingConfig.length; i < c; i++) {

        var ignore = reportingConfig[i];
        if ((!ignore.rule || ignore.rule === ruleId) &&
            (location.line > ignore.start.line || (location.line === ignore.start.line && location.column >= ignore.start.column)) &&
            (!ignore.end || (location.line < ignore.end.line || (location.line === ignore.end.line && location.column <= ignore.end.column)))) {
            return true;
        }
    }

    return false;
}

/**
 * Process initial config to make it safe to extend by file comment config
 * @param  {Object} config Initial config
 * @returns {Object}        Processed config
 */
function prepareConfig(config) {

    config.globals = config.globals || config.global || {};
    delete config.global;

    var copiedRules = {},
        ecmaFeatures = {},
        preparedConfig;

    if (typeof config.rules === "object") {
        Object.keys(config.rules).forEach(function(k) {
            var rule = config.rules[k];
            if (rule === null) {
                throw new Error("Invalid config for rule '" + k + "'\.");
            }
            if (Array.isArray(rule)) {
                copiedRules[k] = rule.slice();
            } else {
                copiedRules[k] = rule;
            }
        });
    }

    // merge in environment ecmaFeatures
    if (typeof config.env === "object") {
        Object.keys(config.env).forEach(function(env) {
            if (config.env[env] && environments[env].ecmaFeatures) {
                assign(ecmaFeatures, environments[env].ecmaFeatures);
            }
        });
    }

    preparedConfig = {
        rules: copiedRules,
        parser: config.parser || "espree",
        globals: util.mergeConfigs({}, config.globals),
        env: util.mergeConfigs({}, config.env || {}),
        settings: util.mergeConfigs({}, config.settings || {}),
        ecmaFeatures: util.mergeConfigs(ecmaFeatures, config.ecmaFeatures || {})
    };

    // can't have global return inside of modules
    if (preparedConfig.ecmaFeatures.modules) {
        preparedConfig.ecmaFeatures.globalReturn = false;
    }

    return preparedConfig;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Object that is responsible for verifying JavaScript text
 * @name eslint
 */
module.exports = (function() {

    var api = Object.create(new EventEmitter()),
        messages = [],
        currentText = null,
        currentTextLines = [],
        currentConfig = null,
        currentTokens = null,
        currentScopes = null,
        scopeMap = null,
        scopeManager = null,
        currentFilename = null,
        controller = null,
        reportingConfig = [],
        commentLocsEnter = [],
        commentLocsExit = [],
        currentAST = null;

    /**
     * Parses text into an AST. Moved out here because the try-catch prevents
     * optimization of functions, so it's best to keep the try-catch as isolated
     * as possible
     * @param {string} text The text to parse.
     * @param {Object} config The ESLint configuration object.
     * @returns {ASTNode} The AST if successful or null if not.
     * @private
     */
    function parse(text, config) {

        var parser;

        try {
            parser = require(config.parser);
        } catch (ex) {
            messages.push({
                fatal: true,
                severity: 2,
                message: ex.message,
                line: 0,
                column: 0
            });

            return null;
        }

        /*
         * Check for parsing errors first. If there's a parsing error, nothing
         * else can happen. However, a parsing error does not throw an error
         * from this method - it's just considered a fatal error message, a
         * problem that ESLint identified just like any other.
         */
        try {
            return parser.parse(text, {
                loc: true,
                range: true,
                raw: true,
                tokens: true,
                comment: true,
                attachComment: true,
                ecmaFeatures: config.ecmaFeatures
            });
        } catch (ex) {

            messages.push({
                fatal: true,
                severity: 2,

                // messages come as "Line X: Unexpected token foo", so strip off leading part
                message: ex.message.substring(ex.message.indexOf(":") + 1).trim(),

                line: ex.lineNumber,
                column: ex.column
            });

            return null;
        }
    }

    /**
     * Check collection of comments to prevent double event for comment as
     * leading and trailing, then emit event if passing
     * @param {ASTNode[]} comments Collection of comment nodes
     * @param {Object[]} locs List of locations of previous comment nodes
     * @param {string} eventName Event name postfix
     * @returns {void}
     */
    function emitComments(comments, locs, eventName) {

        if (comments.length) {
            comments.forEach(function(node) {
                if (locs.indexOf(node.loc) >= 0) {
                    locs.splice(locs.indexOf(node.loc), 1);
                } else {
                    locs.push(node.loc);
                    api.emit(node.type + eventName, node);
                }
            });
        }
    }

    /**
     * Shortcut to check and emit enter of comment nodes
     * @param {ASTNode[]} comments Collection of comment nodes
     * @returns {void}
     */
    function emitCommentsEnter(comments) {
        emitComments(comments, commentLocsEnter, "Comment");
    }

    /**
     * Shortcut to check and emit exit of comment nodes
     * @param {ASTNode[]} comments Collection of comment nodes
     * @returns {void}
     */
    function emitCommentsExit(comments) {
        emitComments(comments, commentLocsExit, "Comment:exit");
    }

    /**
     * Get the severity level of a rule (0 - none, 1 - warning, 2 - error)
     * Returns 0 if the rule config is not valid (an Array or a number)
     * @param {Array|number} ruleConfig rule configuration
     * @returns {number} 0, 1, or 2, indicating rule severity
     */
    function getRuleSeverity(ruleConfig) {
        if (typeof ruleConfig === "number") {
            return ruleConfig;
        } else if (Array.isArray(ruleConfig)) {
            return ruleConfig[0];
        } else {
            return 0;
        }
    }

    /**
     * Get the options for a rule (not including severity), if any
     * @param {Array|number} ruleConfig rule configuration
     * @returns {Array} of rule options, empty Array if none
     */
    function getRuleOptions(ruleConfig) {
        if (Array.isArray(ruleConfig)) {
            return ruleConfig.slice(1);
        } else {
            return [];
        }
    }

    // set unlimited listeners (see https://github.com/eslint/eslint/issues/524)
    api.setMaxListeners(0);

    /**
     * Resets the internal state of the object.
     * @returns {void}
     */
    api.reset = function() {
        this.removeAllListeners();
        messages = [];
        currentAST = null;
        currentConfig = null;
        currentText = null;
        currentTextLines = [];
        currentTokens = null;
        currentScopes = null;
        scopeMap = null;
        scopeManager = null;
        controller = null;
        reportingConfig = [];
        commentLocsEnter = [];
        commentLocsExit = [];
    };

    /**
     * Verifies the text against the rules specified by the second argument.
     * @param {string} text The JavaScript text to verify.
     * @param {Object} config An object whose keys specify the rules to use.
     * @param {string=} filename The optional filename of the file being checked.
     *      If this is not set, the filename will default to '<input>' in the rule context.
     * @param {boolean=} saveState Indicates if the state from the last run should be saved.
     *      Mostly useful for testing purposes.
     * @returns {Object[]} The results as an array of messages or null if no messages.
     */
    api.verify = function(text, config, filename, saveState) {

        var ast,
            shebang,
            ecmaFeatures,
            ecmaVersion;

        // set the current parsed filename
        currentFilename = filename;

        if (!saveState) {
            this.reset();
        }

        // there's no input, just exit here
        if (text.trim().length === 0) {
            currentText = text;
            return messages;
        }

        // process initial config to make it safe to extend
        config = prepareConfig(config || {});

        ast = parse(text.replace(/^#!([^\r\n]+)/, function(match, captured) {
            shebang = captured;
            return "//" + captured;
        }), config);

        // if espree failed to parse the file, there's no sense in setting up rules
        if (ast) {

            currentAST = ast;

            // parse global comments and modify config
            modifyConfigsFromComments(ast, config, reportingConfig, messages);

            // enable appropriate rules
            Object.keys(config.rules).filter(function(key) {
                return getRuleSeverity(config.rules[key]) > 0;
            }).forEach(function(key) {

                var ruleCreator = rules.get(key),
                    severity = getRuleSeverity(config.rules[key]),
                    options = getRuleOptions(config.rules[key]),
                    rule;

                if (ruleCreator) {
                    try {
                        rule = ruleCreator(new RuleContext(
                            key, api, severity, options,
                            config.settings, config.ecmaFeatures
                        ));

                        // add all the node types as listeners
                        Object.keys(rule).forEach(function(nodeType) {
                            api.on(nodeType, timing.enabled
                                ? timing.time(key, rule[nodeType])
                                : rule[nodeType]
                            );
                        });
                    } catch(ex) {
                        ex.message = "Error while loading rule '" + key + "': " + ex.message;
                        throw ex;
                    }

                } else {
                    throw new Error("Definition for rule '" + key + "' was not found.");
                }
            });

            // save config so rules can access as necessary
            currentConfig = config;
            currentText = text;
            controller = new estraverse.Controller();

            ecmaFeatures = currentConfig.ecmaFeatures;
            ecmaVersion = (ecmaFeatures.blockBindings || ecmaFeatures.classes ||
                    ecmaFeatures.modules || ecmaFeatures.defaultParams ||
                    ecmaFeatures.destructuring) ? 6 : 5;


            // gather data that may be needed by the rules
            scopeManager = escope.analyze(ast, {
                ignoreEval: true,
                nodejsScope: ecmaFeatures.globalReturn,
                ecmaVersion: ecmaVersion,
                sourceType: ecmaFeatures.modules ? "module" : "script"
            });
            currentScopes = scopeManager.scopes;

            /*
             * Index the scopes by the start range of their block for efficient
             * lookup in getScope.
             */
            scopeMap = [];
            currentScopes.forEach(function (scope, index) {
                var range = scope.block.range[0];

                // Sometimes two scopes are returned for a given node. This is
                // handled later in a known way, so just don't overwrite here.
                if (!scopeMap[range]) {
                    scopeMap[range] = index;
                }
            });

            /*
             * Split text here into array of lines so
             * it's not being done repeatedly
             * by individual rules.
             */
            currentTextLines = currentText.split(/\r?\n|\u2028|\u2029/g);

            // Freezing so array isn't accidentally changed by a rule.
            Object.freeze(currentTextLines);

            currentTokens = createTokenStore(ast.tokens);
            Object.keys(currentTokens).forEach(function(method) {
                api[method] = currentTokens[method];
            });

            // augment global scope with declared global variables
            addDeclaredGlobals(ast, currentScopes[0], currentConfig);

            // remove shebang comments
            if (shebang && ast.comments.length && ast.comments[0].value === shebang) {
                ast.comments.splice(0, 1);

                if (ast.body.length && ast.body[0].leadingComments && ast.body[0].leadingComments[0].value === shebang) {
                    ast.body[0].leadingComments.splice(0, 1);
                }
            }

            /*
             * Each node has a type property. Whenever a particular type of node is found,
             * an event is fired. This allows any listeners to automatically be informed
             * that this type of node has been found and react accordingly.
             */
            controller.traverse(ast, {
                enter: function(node, parent) {

                    var comments = api.getComments(node);

                    emitCommentsEnter(comments.leading);
                    node.parent = parent;
                    api.emit(node.type, node);
                    emitCommentsEnter(comments.trailing);
                },
                leave: function(node) {

                    var comments = api.getComments(node);

                    emitCommentsExit(comments.trailing);
                    api.emit(node.type + ":exit", node);
                    emitCommentsExit(comments.leading);
                }
            });

        }

        // sort by line and column
        messages.sort(function(a, b) {
            var lineDiff = a.line - b.line;

            if (lineDiff === 0) {
                return a.column - b.column;
            } else {
                return lineDiff;
            }
        });

        return messages;
    };

    /**
     * Reports a message from one of the rules.
     * @param {string} ruleId The ID of the rule causing the message.
     * @param {number} severity The severity level of the rule as configured.
     * @param {ASTNode} node The AST node that the message relates to.
     * @param {Object=} location An object containing the error line and column
     *      numbers. If location is not provided the node's start location will
     *      be used.
     * @param {string} message The actual message.
     * @param {Object} opts Optional template data which produces a formatted message
     *     with symbols being replaced by this object's values.
     * @returns {void}
     */
    api.report = function(ruleId, severity, node, location, message, opts) {

        if (typeof location === "string") {
            opts = message;
            message = location;
            location = node.loc.start;
        }

        Object.keys(opts || {}).forEach(function (key) {
            var rx = new RegExp("{{" + escapeRegExp(key) + "}}", "g");
            message = message.replace(rx, opts[key]);
        });

        if (isDisabledByReportingConfig(reportingConfig, ruleId, location)) {
            return;
        }

        messages.push({
            ruleId: ruleId,
            severity: severity,
            message: message,
            line: location.line,
            column: location.column,
            nodeType: node.type,
            source: currentTextLines[location.line - 1] || ""
        });
    };

    /**
     * Gets the source code for the given node.
     * @param {ASTNode=} node The AST node to get the text for.
     * @param {int=} beforeCount The number of characters before the node to retrieve.
     * @param {int=} afterCount The number of characters after the node to retrieve.
     * @returns {string} The text representing the AST node.
     */
    api.getSource = function(node, beforeCount, afterCount) {
        if (node) {
            return (currentText !== null) ? currentText.slice(Math.max(node.range[0] - (beforeCount || 0), 0),
                node.range[1] + (afterCount || 0)) : null;
        } else {
            return currentText;
        }

    };

    /**
     * Gets the entire source text split into an array of lines.
     * @returns {Array} The source text as an array of lines.
     */
    api.getSourceLines = function() {
        return currentTextLines;
    };

    /**
     * Retrieves an array containing all comments in the source code.
     * @returns {ASTNode[]} An array of comment nodes.
     */
    api.getAllComments = function() {
        return currentAST.comments;
    };

    /**
     * Gets all comments for the given node.
     * @param {ASTNode} node The AST node to get the comments for.
     * @returns {Object} The list of comments indexed by their position.
     */
    api.getComments = function(node) {

        var leadingComments = node.leadingComments || [],
            trailingComments = node.trailingComments || [];

        /*
         * espree adds a "comments" array on Program nodes rather than
         * leadingComments/trailingComments. Comments are only left in the
         * Program node comments array if there is no executable code.
         */
        if (node.type === "Program") {
            if (node.body.length === 0) {
                leadingComments = node.comments;
            }
        }

        return {
            leading: leadingComments,
            trailing: trailingComments
        };
    };

    /**
     * Retrieves the JSDoc comment for a given node.
     * @param {ASTNode} node The AST node to get the comment for.
     * @returns {ASTNode} The BlockComment node containing the JSDoc for the
     *      given node or null if not found.
     */
    api.getJSDocComment = function(node) {

        var parent = node.parent,
            line = node.loc.start.line;

        /**
         * Finds a JSDoc comment node in an array of comment nodes.
         * @param {ASTNode[]} comments The array of comment nodes to search.
         * @returns {ASTNode} The node if found, null if not.
         * @private
         */
        function findJSDocComment(comments) {

            if (comments) {
                for (var i = comments.length - 1; i >= 0; i--) {
                    if (comments[i].type === "Block" && comments[i].value.charAt(0) === "*") {

                        if (line - comments[i].loc.end.line <= 1) {
                            return comments[i];
                        } else {
                            break;
                        }
                    }
                }
            }

            return null;
        }

        switch (node.type) {
            case "FunctionDeclaration":
                return findJSDocComment(node.leadingComments);

            case "ArrowFunctionExpression":
            case "FunctionExpression":

                if (parent.type !== "CallExpression" || parent.callee !== node) {
                    while (parent && !parent.leadingComments && !/Function/.test(parent.type)) {
                        parent = parent.parent;
                    }

                    return parent && (parent.type !== "FunctionDeclaration") ? findJSDocComment(parent.leadingComments) : null;
                }

                // falls through

            default:
                return null;
        }
    };

    /**
     * Gets nodes that are ancestors of current node.
     * @returns {ASTNode[]} Array of objects representing ancestors.
     */
    api.getAncestors = function() {
        return controller.parents();
    };

    /**
     * Gets the deepest node containing a range index.
     * @param {int} index Range index of the desired node.
     * @returns {ASTNode} [description]
     */
    api.getNodeByRangeIndex = function(index) {
        var result = null;

        estraverse.traverse(controller.root, {
            enter: function (node) {
                if (node.range[0] <= index && index < node.range[1]) {
                    result = node;
                } else {
                    this.skip();
                }
            },
            leave: function (node) {
                if (node === result) {
                    this.break();
                }
            }
        });

        return result;
    };

    /**
     * Gets the scope for the current node.
     * @returns {Object} An object representing the current node's scope.
     */
    api.getScope = function() {
        var parents = controller.parents(),
            scope = currentScopes[0];

        // Don't do this for Program nodes - they have no parents
        if (parents.length) {

            // if current node is function declaration, add it to the list
            var current = controller.current();
            if (["FunctionDeclaration", "FunctionExpression",
                    "ArrowFunctionExpression"].indexOf(current.type) >= 0) {
                parents.push(current);
            }

            // Ascend the current node's parents
            for (var i = parents.length - 1; i >= 0; --i) {

                scope = scopeManager.acquire(parents[i]);
                if (scope) {
                    return scope;
                }

            }

        }

        return currentScopes[0];
    };

    /**
     * Gets the filename for the currently parsed source.
     * @returns {string} The filename associated with the source being parsed.
     *     Defaults to "<input>" if no filename info is present.
     */
    api.getFilename = function() {
        if (typeof currentFilename === "string") {
            return currentFilename;
        } else {
            return "<input>";
        }
    };

    /**
     * Defines a new linting rule.
     * @param {string} ruleId A unique rule identifier
     * @param {Function} ruleModule Function from context to object mapping AST node types to event handlers
     * @returns {void}
     */
    var defineRule = api.defineRule = function(ruleId, ruleModule) {
        rules.define(ruleId, ruleModule);
    };

    /**
     * Defines many new linting rules.
     * @param {object} rulesToDefine map from unique rule identifier to rule
     * @returns {void}
     */
    api.defineRules = function(rulesToDefine) {
        Object.getOwnPropertyNames(rulesToDefine).forEach(function(ruleId) {
            defineRule(ruleId, rulesToDefine[ruleId]);
        });
    };

    /**
     * Gets the default eslint configuration.
     * @returns {Object} Object mapping rule IDs to their default configurations
     */
    api.defaults = function() {
        return require("../conf/eslint.json");
    };

    return api;

}());

},{"../conf/environments":1,"../conf/eslint.json":2,"./rule-context":130,"./rules":131,"./timing":281,"./token-store.js":282,"./util":283,"escape-string-regexp":14,"escope":15,"estraverse-fb":121,"events":3,"object-assign":127}],129:[function(require,module,exports){
module.exports = function() {
    var rules = Object.create(null);
    rules["block-scoped-var"] = require("./rules/block-scoped-var");
    rules["brace-style"] = require("./rules/brace-style");
    rules["camelcase"] = require("./rules/camelcase");
    rules["comma-dangle"] = require("./rules/comma-dangle");
    rules["comma-spacing"] = require("./rules/comma-spacing");
    rules["comma-style"] = require("./rules/comma-style");
    rules["complexity"] = require("./rules/complexity");
    rules["consistent-return"] = require("./rules/consistent-return");
    rules["consistent-this"] = require("./rules/consistent-this");
    rules["curly"] = require("./rules/curly");
    rules["default-case"] = require("./rules/default-case");
    rules["dot-notation"] = require("./rules/dot-notation");
    rules["eol-last"] = require("./rules/eol-last");
    rules["eqeqeq"] = require("./rules/eqeqeq");
    rules["func-names"] = require("./rules/func-names");
    rules["func-style"] = require("./rules/func-style");
    rules["generator-star"] = require("./rules/generator-star");
    rules["global-strict"] = require("./rules/global-strict");
    rules["guard-for-in"] = require("./rules/guard-for-in");
    rules["handle-callback-err"] = require("./rules/handle-callback-err");
    rules["indent"] = require("./rules/indent");
    rules["key-spacing"] = require("./rules/key-spacing");
    rules["max-depth"] = require("./rules/max-depth");
    rules["max-len"] = require("./rules/max-len");
    rules["max-nested-callbacks"] = require("./rules/max-nested-callbacks");
    rules["max-params"] = require("./rules/max-params");
    rules["max-statements"] = require("./rules/max-statements");
    rules["new-cap"] = require("./rules/new-cap");
    rules["new-parens"] = require("./rules/new-parens");
    rules["no-alert"] = require("./rules/no-alert");
    rules["no-array-constructor"] = require("./rules/no-array-constructor");
    rules["no-bitwise"] = require("./rules/no-bitwise");
    rules["no-caller"] = require("./rules/no-caller");
    rules["no-catch-shadow"] = require("./rules/no-catch-shadow");
    rules["no-comma-dangle"] = require("./rules/no-comma-dangle");
    rules["no-cond-assign"] = require("./rules/no-cond-assign");
    rules["no-console"] = require("./rules/no-console");
    rules["no-constant-condition"] = require("./rules/no-constant-condition");
    rules["no-control-regex"] = require("./rules/no-control-regex");
    rules["no-debugger"] = require("./rules/no-debugger");
    rules["no-delete-var"] = require("./rules/no-delete-var");
    rules["no-div-regex"] = require("./rules/no-div-regex");
    rules["no-dupe-args"] = require("./rules/no-dupe-args");
    rules["no-dupe-keys"] = require("./rules/no-dupe-keys");
    rules["no-else-return"] = require("./rules/no-else-return");
    rules["no-empty-class"] = require("./rules/no-empty-class");
    rules["no-empty-label"] = require("./rules/no-empty-label");
    rules["no-empty"] = require("./rules/no-empty");
    rules["no-eq-null"] = require("./rules/no-eq-null");
    rules["no-eval"] = require("./rules/no-eval");
    rules["no-ex-assign"] = require("./rules/no-ex-assign");
    rules["no-extend-native"] = require("./rules/no-extend-native");
    rules["no-extra-bind"] = require("./rules/no-extra-bind");
    rules["no-extra-boolean-cast"] = require("./rules/no-extra-boolean-cast");
    rules["no-extra-parens"] = require("./rules/no-extra-parens");
    rules["no-extra-semi"] = require("./rules/no-extra-semi");
    rules["no-extra-strict"] = require("./rules/no-extra-strict");
    rules["no-fallthrough"] = require("./rules/no-fallthrough");
    rules["no-floating-decimal"] = require("./rules/no-floating-decimal");
    rules["no-func-assign"] = require("./rules/no-func-assign");
    rules["no-implied-eval"] = require("./rules/no-implied-eval");
    rules["no-inline-comments"] = require("./rules/no-inline-comments");
    rules["no-inner-declarations"] = require("./rules/no-inner-declarations");
    rules["no-invalid-regexp"] = require("./rules/no-invalid-regexp");
    rules["no-irregular-whitespace"] = require("./rules/no-irregular-whitespace");
    rules["no-iterator"] = require("./rules/no-iterator");
    rules["no-label-var"] = require("./rules/no-label-var");
    rules["no-labels"] = require("./rules/no-labels");
    rules["no-lone-blocks"] = require("./rules/no-lone-blocks");
    rules["no-lonely-if"] = require("./rules/no-lonely-if");
    rules["no-loop-func"] = require("./rules/no-loop-func");
    rules["no-mixed-requires"] = require("./rules/no-mixed-requires");
    rules["no-mixed-spaces-and-tabs"] = require("./rules/no-mixed-spaces-and-tabs");
    rules["no-multi-spaces"] = require("./rules/no-multi-spaces");
    rules["no-multi-str"] = require("./rules/no-multi-str");
    rules["no-multiple-empty-lines"] = require("./rules/no-multiple-empty-lines");
    rules["no-native-reassign"] = require("./rules/no-native-reassign");
    rules["no-negated-in-lhs"] = require("./rules/no-negated-in-lhs");
    rules["no-nested-ternary"] = require("./rules/no-nested-ternary");
    rules["no-new-func"] = require("./rules/no-new-func");
    rules["no-new-object"] = require("./rules/no-new-object");
    rules["no-new-require"] = require("./rules/no-new-require");
    rules["no-new-wrappers"] = require("./rules/no-new-wrappers");
    rules["no-new"] = require("./rules/no-new");
    rules["no-obj-calls"] = require("./rules/no-obj-calls");
    rules["no-octal-escape"] = require("./rules/no-octal-escape");
    rules["no-octal"] = require("./rules/no-octal");
    rules["no-path-concat"] = require("./rules/no-path-concat");
    rules["no-plusplus"] = require("./rules/no-plusplus");
    rules["no-process-env"] = require("./rules/no-process-env");
    rules["no-process-exit"] = require("./rules/no-process-exit");
    rules["no-proto"] = require("./rules/no-proto");
    rules["no-redeclare"] = require("./rules/no-redeclare");
    rules["no-regex-spaces"] = require("./rules/no-regex-spaces");
    rules["no-reserved-keys"] = require("./rules/no-reserved-keys");
    rules["no-restricted-modules"] = require("./rules/no-restricted-modules");
    rules["no-return-assign"] = require("./rules/no-return-assign");
    rules["no-script-url"] = require("./rules/no-script-url");
    rules["no-self-compare"] = require("./rules/no-self-compare");
    rules["no-sequences"] = require("./rules/no-sequences");
    rules["no-shadow-restricted-names"] = require("./rules/no-shadow-restricted-names");
    rules["no-shadow"] = require("./rules/no-shadow");
    rules["no-space-before-semi"] = require("./rules/no-space-before-semi");
    rules["no-spaced-func"] = require("./rules/no-spaced-func");
    rules["no-sparse-arrays"] = require("./rules/no-sparse-arrays");
    rules["no-sync"] = require("./rules/no-sync");
    rules["no-ternary"] = require("./rules/no-ternary");
    rules["no-throw-literal"] = require("./rules/no-throw-literal");
    rules["no-trailing-spaces"] = require("./rules/no-trailing-spaces");
    rules["no-undef-init"] = require("./rules/no-undef-init");
    rules["no-undef"] = require("./rules/no-undef");
    rules["no-undefined"] = require("./rules/no-undefined");
    rules["no-underscore-dangle"] = require("./rules/no-underscore-dangle");
    rules["no-unreachable"] = require("./rules/no-unreachable");
    rules["no-unused-expressions"] = require("./rules/no-unused-expressions");
    rules["no-unused-vars"] = require("./rules/no-unused-vars");
    rules["no-use-before-define"] = require("./rules/no-use-before-define");
    rules["no-var"] = require("./rules/no-var");
    rules["no-void"] = require("./rules/no-void");
    rules["no-warning-comments"] = require("./rules/no-warning-comments");
    rules["no-with"] = require("./rules/no-with");
    rules["no-wrap-func"] = require("./rules/no-wrap-func");
    rules["one-var"] = require("./rules/one-var");
    rules["operator-assignment"] = require("./rules/operator-assignment");
    rules["padded-blocks"] = require("./rules/padded-blocks");
    rules["quote-props"] = require("./rules/quote-props");
    rules["quotes"] = require("./rules/quotes");
    rules["radix"] = require("./rules/radix");
    rules["semi-spacing"] = require("./rules/semi-spacing");
    rules["semi"] = require("./rules/semi");
    rules["sort-vars"] = require("./rules/sort-vars");
    rules["space-after-function-name"] = require("./rules/space-after-function-name");
    rules["space-after-keywords"] = require("./rules/space-after-keywords");
    rules["space-before-blocks"] = require("./rules/space-before-blocks");
    rules["space-before-function-parentheses"] = require("./rules/space-before-function-parentheses");
    rules["space-in-brackets"] = require("./rules/space-in-brackets");
    rules["space-in-parens"] = require("./rules/space-in-parens");
    rules["space-infix-ops"] = require("./rules/space-infix-ops");
    rules["space-return-throw-case"] = require("./rules/space-return-throw-case");
    rules["space-unary-ops"] = require("./rules/space-unary-ops");
    rules["spaced-line-comment"] = require("./rules/spaced-line-comment");
    rules["strict"] = require("./rules/strict");
    rules["use-isnan"] = require("./rules/use-isnan");
    rules["valid-jsdoc"] = require("./rules/valid-jsdoc");
    rules["valid-typeof"] = require("./rules/valid-typeof");
    rules["vars-on-top"] = require("./rules/vars-on-top");
    rules["wrap-iife"] = require("./rules/wrap-iife");
    rules["wrap-regex"] = require("./rules/wrap-regex");
    rules["yoda"] = require("./rules/yoda");

    return rules;
};
},{"./rules/block-scoped-var":132,"./rules/brace-style":133,"./rules/camelcase":134,"./rules/comma-dangle":135,"./rules/comma-spacing":136,"./rules/comma-style":137,"./rules/complexity":138,"./rules/consistent-return":139,"./rules/consistent-this":140,"./rules/curly":141,"./rules/default-case":142,"./rules/dot-notation":143,"./rules/eol-last":144,"./rules/eqeqeq":145,"./rules/func-names":146,"./rules/func-style":147,"./rules/generator-star":148,"./rules/global-strict":149,"./rules/guard-for-in":150,"./rules/handle-callback-err":151,"./rules/indent":152,"./rules/key-spacing":153,"./rules/max-depth":154,"./rules/max-len":155,"./rules/max-nested-callbacks":156,"./rules/max-params":157,"./rules/max-statements":158,"./rules/new-cap":159,"./rules/new-parens":160,"./rules/no-alert":161,"./rules/no-array-constructor":162,"./rules/no-bitwise":163,"./rules/no-caller":164,"./rules/no-catch-shadow":165,"./rules/no-comma-dangle":166,"./rules/no-cond-assign":167,"./rules/no-console":168,"./rules/no-constant-condition":169,"./rules/no-control-regex":170,"./rules/no-debugger":171,"./rules/no-delete-var":172,"./rules/no-div-regex":173,"./rules/no-dupe-args":174,"./rules/no-dupe-keys":175,"./rules/no-else-return":176,"./rules/no-empty":179,"./rules/no-empty-class":177,"./rules/no-empty-label":178,"./rules/no-eq-null":180,"./rules/no-eval":181,"./rules/no-ex-assign":182,"./rules/no-extend-native":183,"./rules/no-extra-bind":184,"./rules/no-extra-boolean-cast":185,"./rules/no-extra-parens":186,"./rules/no-extra-semi":187,"./rules/no-extra-strict":188,"./rules/no-fallthrough":189,"./rules/no-floating-decimal":190,"./rules/no-func-assign":191,"./rules/no-implied-eval":192,"./rules/no-inline-comments":193,"./rules/no-inner-declarations":194,"./rules/no-invalid-regexp":195,"./rules/no-irregular-whitespace":196,"./rules/no-iterator":197,"./rules/no-label-var":198,"./rules/no-labels":199,"./rules/no-lone-blocks":200,"./rules/no-lonely-if":201,"./rules/no-loop-func":202,"./rules/no-mixed-requires":203,"./rules/no-mixed-spaces-and-tabs":204,"./rules/no-multi-spaces":205,"./rules/no-multi-str":206,"./rules/no-multiple-empty-lines":207,"./rules/no-native-reassign":208,"./rules/no-negated-in-lhs":209,"./rules/no-nested-ternary":210,"./rules/no-new":215,"./rules/no-new-func":211,"./rules/no-new-object":212,"./rules/no-new-require":213,"./rules/no-new-wrappers":214,"./rules/no-obj-calls":216,"./rules/no-octal":218,"./rules/no-octal-escape":217,"./rules/no-path-concat":219,"./rules/no-plusplus":220,"./rules/no-process-env":221,"./rules/no-process-exit":222,"./rules/no-proto":223,"./rules/no-redeclare":224,"./rules/no-regex-spaces":225,"./rules/no-reserved-keys":226,"./rules/no-restricted-modules":227,"./rules/no-return-assign":228,"./rules/no-script-url":229,"./rules/no-self-compare":230,"./rules/no-sequences":231,"./rules/no-shadow":233,"./rules/no-shadow-restricted-names":232,"./rules/no-space-before-semi":234,"./rules/no-spaced-func":235,"./rules/no-sparse-arrays":236,"./rules/no-sync":237,"./rules/no-ternary":238,"./rules/no-throw-literal":239,"./rules/no-trailing-spaces":240,"./rules/no-undef":242,"./rules/no-undef-init":241,"./rules/no-undefined":243,"./rules/no-underscore-dangle":244,"./rules/no-unreachable":245,"./rules/no-unused-expressions":246,"./rules/no-unused-vars":247,"./rules/no-use-before-define":248,"./rules/no-var":249,"./rules/no-void":250,"./rules/no-warning-comments":251,"./rules/no-with":252,"./rules/no-wrap-func":253,"./rules/one-var":254,"./rules/operator-assignment":255,"./rules/padded-blocks":256,"./rules/quote-props":257,"./rules/quotes":258,"./rules/radix":259,"./rules/semi":261,"./rules/semi-spacing":260,"./rules/sort-vars":262,"./rules/space-after-function-name":263,"./rules/space-after-keywords":264,"./rules/space-before-blocks":265,"./rules/space-before-function-parentheses":266,"./rules/space-in-brackets":267,"./rules/space-in-parens":268,"./rules/space-infix-ops":269,"./rules/space-return-throw-case":270,"./rules/space-unary-ops":271,"./rules/spaced-line-comment":272,"./rules/strict":273,"./rules/use-isnan":274,"./rules/valid-jsdoc":275,"./rules/valid-typeof":276,"./rules/vars-on-top":277,"./rules/wrap-iife":278,"./rules/wrap-regex":279,"./rules/yoda":280}],130:[function(require,module,exports){
/**
 * @fileoverview RuleContext utility for rules
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var PASSTHROUGHS = [
        "getAllComments",
        "getAncestors",
        "getComments",
        "getFilename",
        "getFirstToken",
        "getFirstTokens",
        "getJSDocComment",
        "getLastToken",
        "getLastTokens",
        "getNodeByRangeIndex",
        "getScope",
        "getSource",
        "getSourceLines",
        "getTokenAfter",
        "getTokenBefore",
        "getTokenByRangeStart",
        "getTokens",
        "getTokensAfter",
        "getTokensBefore",
        "getTokensBetween"
    ];

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Acts as an abstraction layer between rules and the main eslint object.
 * @constructor
 * @param {string} ruleId The ID of the rule using this object.
 * @param {eslint} eslint The eslint object.
 * @param {number} severity The configured severity level of the rule.
 * @param {array} options The configuration information to be added to the rule.
 * @param {object} settings The configuration settings passed from the config file.
 * @param {object} ecmaFeatures The ecmaFeatures settings passed from the config file.
 */
function RuleContext(ruleId, eslint, severity, options, settings, ecmaFeatures) {

    /**
     * The read-only ID of the rule.
     */
    Object.defineProperty(this, "id", {
        value: ruleId
    });

    /**
     * The read-only options of the rule
     */
    Object.defineProperty(this, "options", {
        value: options
    });

    /**
     * The read-only settings shared between all rules
     */
    Object.defineProperty(this, "settings", {
        value: settings
    });

    /**
     * The read-only ecmaFeatures shared across all rules
     */
    Object.defineProperty(this, "ecmaFeatures", {
        value: Object.create(ecmaFeatures)
    });
    Object.freeze(this.ecmaFeatures);

    // copy over passthrough methods
    PASSTHROUGHS.forEach(function(name) {
        this[name] = function() {
            return eslint[name].apply(eslint, arguments);
        };
    }, this);

    /**
     * Passthrough to eslint.report() that automatically assigns the rule ID and severity.
     * @param {ASTNode} node The AST node related to the message.
     * @param {Object=} location The location of the error.
     * @param {string} message The message to display to the user.
     * @param {Object} opts Optional template data which produces a formatted message
     *     with symbols being replaced by this object's values.
     * @returns {void}
     */
    this.report = function(node, location, message, opts) {
        eslint.report(ruleId, severity, node, location, message, opts);
    };

}

RuleContext.prototype = {
    constructor: RuleContext
};

module.exports = RuleContext;

},{}],131:[function(require,module,exports){
/**
 * @fileoverview Defines a storage for rules.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var loadRules = require("./load-rules");

//------------------------------------------------------------------------------
// Privates
//------------------------------------------------------------------------------

var rules = Object.create(null);

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Registers a rule module for rule id in storage.
 * @param {String} ruleId Rule id (file name).
 * @param {Function} ruleModule Rule handler.
 * @returns {void}
 */
function define(ruleId, ruleModule) {
    rules[ruleId] = ruleModule;
}

exports.define = define;

/**
 * Loads and registers all rules from passed rules directory.
 * @param {String} [rulesDir] Path to rules directory, may be relative. Defaults to `lib/rules`.
 * @returns {void}
 */
function load(rulesDir) {
    var newRules = loadRules(rulesDir);
    Object.keys(newRules).forEach(function(ruleId) {
        define(ruleId, newRules[ruleId]);
    });
}

exports.load = load;

/**
 * Registers all given rules of a plugin.
 * @param {Object} pluginRules A key/value map of rule definitions.
 * @param {String} pluginName The name of the plugin without prefix (`eslint-plugin-`).
 * @returns {void}
 */
exports.import = function (pluginRules, pluginName) {
    Object.keys(pluginRules).forEach(function (ruleId) {
        var qualifiedRuleId = pluginName + "/" + ruleId,
            rule = pluginRules[ruleId];

        define(qualifiedRuleId, rule);
    });
};

/**
 * Access rule handler by id (file name).
 * @param {String} ruleId Rule id (file name).
 * @returns {Function} Rule handler.
 */
exports.get = function(ruleId) {
    return rules[ruleId];
};

/**
 * Reset rules storage.
 * Should be used only in tests.
 * @returns {void}
 */
exports.testClear = function() {
    rules = Object.create(null);
};

//------------------------------------------------------------------------------
// Initialization
//------------------------------------------------------------------------------

// loads built-in rules
load();

},{"./load-rules":129}],132:[function(require,module,exports){
/**
 * @fileoverview Rule to check for "block scoped" variables by binding context
 * @author Matt DuVall <http://www.mattduvall.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var scopeStack = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determines whether an identifier is in declaration position or is a non-declaration reference.
     * @param {ASTNode} id The identifier.
     * @param {ASTNode} parent The identifier's parent AST node.
     * @returns {Boolean} true when the identifier is in declaration position.
     */
    function isDeclaration(id, parent) {
        switch (parent.type) {
            case "FunctionDeclaration":
            case "FunctionExpression":
                return parent.params.indexOf(id) > -1 || id === parent.id;

            case "VariableDeclarator":
                return id === parent.id;

            case "CatchClause":
                return id === parent.param;

            default:
                return false;
        }
    }

    /**
     * Determines whether an identifier is in property position.
     * @param {ASTNode} id The identifier.
     * @param {ASTNode} parent The identifier's parent AST node.
     * @returns {Boolean} true when the identifier is in property position.
     */
    function isProperty(id, parent) {
        switch (parent.type) {
            case "MemberExpression":
                return id === parent.property && !parent.computed;

            case "Property":
                return id === parent.key;

            default:
                return false;
        }
    }

    /**
     * Pushes a new scope object on the scope stack.
     * @returns {void}
     */
    function pushScope() {
        scopeStack.push([]);
    }

    /**
     * Removes the topmost scope object from the scope stack.
     * @returns {void}
     */
    function popScope() {
        scopeStack.pop();
    }

    /**
     * Declares the given names in the topmost scope object.
     * @param {[String]} names A list of names to declare.
     * @returns {void}
     */
    function declare(names) {
        [].push.apply(scopeStack[scopeStack.length - 1], names);
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    function functionHandler(node) {
        pushScope();
        declare(node.params.map(function(id) {
            return id.name;
        }));
        declare(node.id ? [node.id.name] : []);
        declare(node.rest ? [node.rest.name] : []);
        declare(["arguments"]);
    }

    function variableDeclarationHandler(node) {
        node.declarations.forEach(function(declaration) {

            switch (declaration.id.type) {
                case "Identifier":
                    declare([declaration.id.name]);
                    break;

                case "ObjectPattern":
                    declare(declaration.id.properties.map(function(property) {
                        return property.key.name;
                    }));
                    break;

                case "ArrayPattern":
                    declare(declaration.id.elements.map(function(element) {
                        return element.name;
                    }));
                    break;

                // no default
            }

        });

    }

    return {
        "Program": function() {
            var scope = context.getScope();
            scopeStack = [scope.variables.map(function(v) {
                return v.name;
            })];

            // global return creates another scope
            if (context.ecmaFeatures.globalReturn) {
                scope = scope.childScopes[0];
                scopeStack.push(scope.variables.map(function(v) {
                    return v.name;
                }));
            }
        },

        "BlockStatement": function(node) {
            var statements = node.body;
            pushScope();
            statements.forEach(function(stmt) {
                if (stmt.type === "VariableDeclaration") {
                    variableDeclarationHandler(stmt);
                } else if (stmt.type === "FunctionDeclaration") {
                    declare([stmt.id.name]);
                }
            });
        },

        "VariableDeclaration": function (node) {
            variableDeclarationHandler(node);
        },

        "BlockStatement:exit": popScope,

        "CatchClause": function(node) {
            pushScope();
            declare([node.param.name]);
        },
        "CatchClause:exit": popScope,

        "FunctionDeclaration": functionHandler,
        "FunctionDeclaration:exit": popScope,

        "FunctionExpression": functionHandler,
        "FunctionExpression:exit": popScope,

        "ArrowFunctionExpression": functionHandler,
        "ArrowFunctionExpression:exit": popScope,

        "ForStatement": function() {
            pushScope();
        },
        "ForStatement:exit": popScope,

        "ForInStatement": function() {
            pushScope();
        },
        "ForInStatement:exit": popScope,

        "ForOfStatement": function() {
            pushScope();
        },
        "ForOfStatement:exit": popScope,

        "Identifier": function(node) {
            var ancestor = context.getAncestors().pop();
            if (isDeclaration(node, ancestor) || isProperty(node, ancestor) || ancestor.type === "LabeledStatement") {
                return;
            }

            for (var i = 0, l = scopeStack.length; i < l; i++) {
                if (scopeStack[i].indexOf(node.name) > -1) {
                    return;
                }
            }

            context.report(node, "\"" + node.name + "\" used outside of binding context.");
        }
    };

};

},{}],133:[function(require,module,exports){
/**
 * @fileoverview Rule to flag block statements that do not use the one true brace style
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var style = context.options[0] || "1tbs";
    var params = context.options[1] || {};

    var OPEN_MESSAGE = "Opening curly brace does not appear on the same line as controlling statement.",
        BODY_MESSAGE = "Statement inside of curly braces should be on next line.",
        CLOSE_MESSAGE = "Closing curly brace does not appear on the same line as the subsequent block.",
        CLOSE_MESSAGE_SINGLE = "Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.",
        CLOSE_MESSAGE_STROUSTRUP = "Closing curly brace appears on the same line as the subsequent block.";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determines if a given node is a block statement.
     * @param {ASTNode} node The node to check.
     * @returns {boolean} True if the node is a block statement, false if not.
     * @private
     */
    function isBlock(node) {
        return node && node.type === "BlockStatement";
    }


    /**
     * Binds a list of properties to a function that verifies that the opening
     * curly brace is on the same line as its controlling statement of a given
     * node.
     * @param {...string} The properties to check on the node.
     * @returns {Function} A function that will perform the check on a node
     * @private
     */
    function checkBlock() {
        var blockProperties = arguments;

        return function(node) {
            [].forEach.call(blockProperties, function(blockProp) {
                var block = node[blockProp], previousToken, curlyToken, curlyTokenEnd, curlyTokensOnSameLine;
                block = node[blockProp];

                if (isBlock(block)) {

                    previousToken = context.getTokenBefore(block);
                    curlyToken = context.getFirstToken(block);
                    curlyTokenEnd = context.getLastToken(block);
                    curlyTokensOnSameLine = curlyToken.loc.start.line === curlyTokenEnd.loc.start.line;

                    if (previousToken.loc.start.line !== curlyToken.loc.start.line) {
                        context.report(node, OPEN_MESSAGE);
                    } else if (block.body.length && params.allowSingleLine) {

                        if (curlyToken.loc.start.line === block.body[0].loc.start.line && !curlyTokensOnSameLine) {
                            context.report(block.body[0], BODY_MESSAGE);
                        } else if (curlyTokenEnd.loc.start.line === block.body[block.body.length - 1].loc.start.line && !curlyTokensOnSameLine) {
                            context.report(block.body[block.body.length - 1], CLOSE_MESSAGE_SINGLE);
                        }

                    } else if (block.body.length && curlyToken.loc.start.line === block.body[0].loc.start.line) {
                        context.report(block.body[0], BODY_MESSAGE);
                    }
                }
            });
        };
    }

    /**
     * Enforces the configured brace style on IfStatements
     * @param {ASTNode} node An IfStatement node.
     * @returns {void}
     * @private
     */
    function checkIfStatement(node) {
        var tokens,
            alternateIsBlock = false,
            alternateIsIfBlock = false;

        checkBlock("consequent", "alternate")(node);

        if (node.alternate) {

            alternateIsBlock = isBlock(node.alternate);
            alternateIsIfBlock = node.alternate.type === "IfStatement" && isBlock(node.alternate.consequent);

            if (alternateIsBlock || alternateIsIfBlock) {
                tokens = context.getTokensBefore(node.alternate, 2);

                if (style === "1tbs") {
                    if (tokens[0].loc.start.line !== tokens[1].loc.start.line) {
                        context.report(node.alternate, CLOSE_MESSAGE);
                    }
                } else if (style === "stroustrup") {
                    if (tokens[0].loc.start.line === tokens[1].loc.start.line) {
                        context.report(node.alternate, CLOSE_MESSAGE_STROUSTRUP);
                    }
                }
            }

        }
    }

    /**
     * Enforces the configured brace style on TryStatements
     * @param {ASTNode} node A TryStatement node.
     * @returns {void}
     * @private
     */
    function checkTryStatement(node) {
        var tokens;

        checkBlock("block", "finalizer")(node);

        if (isBlock(node.finalizer)) {
            tokens = context.getTokensBefore(node.finalizer, 2);
            if (style === "1tbs") {
                if (tokens[0].loc.start.line !== tokens[1].loc.start.line) {
                    context.report(node.finalizer, CLOSE_MESSAGE);
                }
            } else if (style === "stroustrup") {
                if (tokens[0].loc.start.line === tokens[1].loc.start.line) {
                    context.report(node.finalizer, CLOSE_MESSAGE_STROUSTRUP);
                }
            }
        }
    }

    /**
     * Enforces the configured brace style on CatchClauses
     * @param {ASTNode} node A CatchClause node.
     * @returns {void}
     * @private
     */
    function checkCatchClause(node) {
        var previousToken = context.getTokenBefore(node),
            firstToken = context.getFirstToken(node);

        checkBlock("body")(node);

        if (isBlock(node.body)) {
            if (style === "1tbs") {
                if (previousToken.loc.start.line !== firstToken.loc.start.line) {
                    context.report(node, CLOSE_MESSAGE);
                }
            } else if (style === "stroustrup") {
                if (previousToken.loc.start.line === firstToken.loc.start.line) {
                    context.report(node, CLOSE_MESSAGE_STROUSTRUP);
                }
            }
        }
    }

    /**
     * Enforces the configured brace style on SwitchStatements
     * @param {ASTNode} node A SwitchStatement node.
     * @returns {void}
     * @private
     */
    function checkSwitchStatement(node) {
        var tokens;
        if (node.cases && node.cases.length) {
            tokens = context.getTokensBefore(node.cases[0], 2);
            if (tokens[0].loc.start.line !== tokens[1].loc.start.line) {
                context.report(node, OPEN_MESSAGE);
            }
        } else {
            tokens = context.getLastTokens(node, 3);
            if (tokens[0].loc.start.line !== tokens[1].loc.start.line) {
                context.report(node, OPEN_MESSAGE);
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": checkBlock("body"),
        "FunctionExpression": checkBlock("body"),
        "ArrowFunctionExpression": checkBlock("body"),
        "IfStatement": checkIfStatement,
        "TryStatement": checkTryStatement,
        "CatchClause": checkCatchClause,
        "DoWhileStatement": checkBlock("body"),
        "WhileStatement": checkBlock("body"),
        "WithStatement": checkBlock("body"),
        "ForStatement": checkBlock("body"),
        "ForInStatement": checkBlock("body"),
        "ForOfStatement": checkBlock("body"),
        "SwitchStatement": checkSwitchStatement
    };

};

},{}],134:[function(require,module,exports){
/**
 * @fileoverview Rule to flag non-camelcased identifiers
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Checks if a string contains an underscore and isn't all upper-case
     * @param {String} name The string to check.
     * @returns {boolean} if the string is underscored
     * @private
     */
    function isUnderscored(name) {

        // if there's an underscore, it might be A_CONSTANT, which is okay
        return name.indexOf("_") > -1 && name !== name.toUpperCase();
    }

    /**
     * Reports an AST node as a rule violation.
     * @param {ASTNode} node The node to report.
     * @returns {void}
     * @private
     */
    function report(node) {
        context.report(node, "Identifier '{{name}}' is not in camel case.", { name: node.name });
    }

    return {

        "Identifier": function(node) {

            // Leading and trailing underscores are commonly used to flag private/protected identifiers, strip them
            var name = node.name.replace(/^_+|_+$/g, ""),
                effectiveParent = (node.parent.type === "MemberExpression") ? node.parent.parent : node.parent;

            // MemberExpressions get special rules
            if (node.parent.type === "MemberExpression") {

                // Always report underscored object names
                if (node.parent.object.type === "Identifier" &&
                        node.parent.object.name === node.name &&
                        isUnderscored(name)) {
                    report(node);

                // Report AssignmentExpressions only if they are the left side of the assignment
                } else if (effectiveParent.type === "AssignmentExpression" &&
                        isUnderscored(name) &&
                        (effectiveParent.right.type !== "MemberExpression" ||
                        effectiveParent.left.type === "MemberExpression" &&
                        effectiveParent.left.property.name === node.name)) {
                    report(node);
                }

            // Report anything that is underscored that isn't a CallExpression
            } else if (isUnderscored(name) && effectiveParent.type !== "CallExpression") {
                report(node);
            }
        }
    };

};

},{}],135:[function(require,module,exports){
/**
 * @fileoverview Rule to forbid or enforce dangling commas.
 * @author Ian Christian Myers
 * @copyright 2015 Mathias Schreck
 * @copyright 2013 Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var forbidDanglingComma = context.options[0] !== "always";

    /**
     * Checks the given node for trailing comma and reports violations.
     * @param {ASTNode} node The node of an ObjectExpression or ArrayExpression
     * @returns {void}
     */
    function checkForTrailingComma(node) {
        var items = node.properties || node.elements,
            length = items.length,
            lastItem,
            penultimateToken;

        if (length) {
            lastItem = items[length - 1];
            if (lastItem) {
                penultimateToken = context.getLastToken(node, 1);

                if (forbidDanglingComma) {
                    if (penultimateToken.value === ",") {
                        context.report(lastItem, penultimateToken.loc.start, "Unexpected trailing comma.");
                    }
                } else {
                    if (penultimateToken.value !== ",") {
                        context.report(lastItem, lastItem.loc.end, "Missing trailing comma.");
                    }
                }
            }
        }
    }

    return {
        "ObjectExpression": checkForTrailingComma,
        "ArrayExpression": checkForTrailingComma
    };
};

},{}],136:[function(require,module,exports){
/**
 * @fileoverview Comma spacing - validates spacing before and after comma
 * @author Vignesh Anand aka vegetableman.
 * @copyright 2014 Vignesh Anand. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var options = {
        before: context.options[0] ? !!context.options[0].before : false,
        after: context.options[0] ? !!context.options[0].after : true
    };

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // the index of the last comment that was checked
    var lastCommentIndex = 0;

    /**
     * Determines whether two adjacent tokens have whitespace between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is space between the tokens.
     */
    function isSpaced(left, right) {
        var punctuationLength = context.getTokensBetween(left, right).length; // the length of any parenthesis
        return (left.range[1] + punctuationLength) < right.range[0];
    }

    /**
     * Checks whether two tokens are on the same line.
     * @param {ASTNode} left The leftmost token.
     * @param {ASTNode} right The rightmost token.
     * @returns {boolean} True if the tokens are on the same line, false if not.
     * @private
     */
    function isSameLine(left, right) {
        return left.loc.end.line === right.loc.start.line;
    }

    /**
     * Determines if a given token is a comma operator.
     * @param {ASTNode} token The token to check.
     * @returns {boolean} True if the token is a comma, false if not.
     * @private
     */
    function isComma(token) {
        return !!token && (token.type === "Punctuator") && (token.value === ",");
    }

    /**
     * Reports a spacing error with an appropriate message.
     * @param {ASTNode} node The binary expression node to report.
     * @param {string} dir Is the error "before" or "after" the comma?
     * @returns {void}
     * @private
     */
    function report(node, dir) {
        context.report(node, options[dir] ?
            "A space is required " + dir + " ','." :
            "There should be no space " + dir + " ','.");
    }

    /**
     * Validates the spacing around a comma token.
     * @param {Object} tokens - The tokens to be validated.
     * @param {Token} tokens.comma The token representing the comma.
     * @param {Token} [tokens.left] The last token before the comma.
     * @param {Token} [tokens.right] The first token after the comma.
     * @param {Token|ASTNode} reportItem The item to use when reporting an error.
     * @returns {void}
     * @private
     */
    function validateCommaItemSpacing(tokens, reportItem) {
        if (tokens.left && isSameLine(tokens.left, tokens.comma) &&
                (options.before !== isSpaced(tokens.left, tokens.comma))
        ) {
            report(reportItem, "before");
        }
        if (tokens.right && isSameLine(tokens.comma, tokens.right) &&
                (options.after !== isSpaced(tokens.comma, tokens.right))
        ) {
            report(reportItem, "after");
        }
    }

    /**
     * Determines if a given source index is in a comment or not by checking
     * the index against the comment range. Since the check goes straight
     * through the file, once an index is passed a certain comment, we can
     * go to the next comment to check that.
     * @param {int} index The source index to check.
     * @param {ASTNode[]} comments An array of comment nodes.
     * @returns {boolean} True if the index is within a comment, false if not.
     * @private
     */
    function isIndexInComment(index, comments) {

        var comment;

        while (lastCommentIndex < comments.length) {

            comment = comments[lastCommentIndex];

            if (comment.range[0] <= index && index < comment.range[1]) {
                return true;
            } else if (index > comment.range[1]) {
                lastCommentIndex++;
            } else {
                break;
            }

        }

        return false;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Program": function() {

            var source = context.getSource(),
                allComments = context.getAllComments(),
                pattern = /,/g,
                commaToken,
                previousToken,
                nextToken;

            while (pattern.test(source)) {

                // do not flag anything inside of comments
                if (!isIndexInComment(pattern.lastIndex, allComments)) {
                    commaToken = context.getTokenByRangeStart(pattern.lastIndex - 1);

                    if (commaToken && commaToken.type !== "JSXText") {
                        previousToken = context.getTokenBefore(commaToken);
                        nextToken = context.getTokenAfter(commaToken);
                        validateCommaItemSpacing({
                            comma: commaToken,
                            left: isComma(previousToken) ? null : previousToken,
                            right: isComma(nextToken) ? null : nextToken
                        }, commaToken);
                    }
                }
            }
        }
    };

};

},{}],137:[function(require,module,exports){
/**
 * @fileoverview Comma style - enforces comma styles of two types: last and first
 * @author Vignesh Anand aka vegetableman
 * @copyright 2014 Vignesh Anand. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var style = context.options[0] || "last";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Checks whether two tokens are on the same line.
     * @param {ASTNode} left The leftmost token.
     * @param {ASTNode} right The rightmost token.
     * @returns {boolean} True if the tokens are on the same line, false if not.
     * @private
     */
    function isSameLine(left, right) {
        return left.loc.end.line === right.loc.start.line;
    }

    /**
     * Determines if a given token is a comma operator.
     * @param {ASTNode} token The token to check.
     * @returns {boolean} True if the token is a comma, false if not.
     * @private
     */
    function isComma(token) {
        return !!token && (token.type === "Punctuator") && (token.value === ",");
    }

    /**
     * Validates the spacing around single items in lists.
     * @param {Token} previousItemToken The last token from the previous item.
     * @param {Token} commaToken The token representing the comma.
     * @param {Token} currentItemToken The first token of the current item.
     * @param {Token} reportItem The item to use when reporting an error.
     * @returns {void}
     * @private
     */
    function validateCommaItemSpacing(previousItemToken, commaToken, currentItemToken, reportItem) {

        // if single line
        if (isSameLine(commaToken, currentItemToken) &&
                isSameLine(previousItemToken, commaToken)) {

            return;

        } else if (!isSameLine(commaToken, currentItemToken) &&
                !isSameLine(previousItemToken, commaToken)) {

            // lone comma
            context.report(reportItem, {
                line: commaToken.loc.end.line,
                column: commaToken.loc.start.column
            }, "Bad line breaking before and after ','.");

        } else if (style === "first" && !isSameLine(commaToken, currentItemToken)) {

            context.report(reportItem, "',' should be placed first.");

        } else if (style === "last" && isSameLine(commaToken, currentItemToken)) {

            context.report(reportItem, {
                line: commaToken.loc.end.line,
                column: commaToken.loc.end.column
            }, "',' should be placed last.");
        }
    }

    /**
     * Checks the comma placement with regards to a declaration/property/element
     * @param {ASTNode} node The binary expression node to check
     * @param {string} property The property of the node containing child nodes.
     * @private
     * @returns {void}
     */
    function validateComma(node, property) {
        var items = node[property],
            arrayLiteral = (node.type === "ArrayExpression"),
            previousItemToken;

        if (items.length > 1 || arrayLiteral) {

            // seed as opening [
            previousItemToken = context.getFirstToken(node);

            items.forEach(function(item) {
                var commaToken = item ? context.getTokenBefore(item) : previousItemToken,
                    currentItemToken = item ? context.getFirstToken(item) : context.getTokenAfter(commaToken),
                    reportItem = item || currentItemToken;

                /*
                 * This works by comparing three token locations:
                 * - previousItemToken is the last token of the previous item
                 * - commaToken is the location of the comma before the current item
                 * - currentItemToken is the first token of the current item
                 *
                 * These values get switched around if item is undefined.
                 * previousItemToken will refer to the last token not belonging
                 * to the current item, which could be a comma or an opening
                 * square bracket. currentItemToken could be a comma.
                 *
                 * All comparisons are done based on these tokens directly, so
                 * they are always valid regardless of an undefined item.
                 */
                if (isComma(commaToken)) {
                    validateCommaItemSpacing(previousItemToken, commaToken,
                            currentItemToken, reportItem);
                }

                previousItemToken = item ? context.getLastToken(item) : previousItemToken;
            });

            /*
             * Special case for array literals that have empty last items, such
             * as [ 1, 2, ]. These arrays only have two items show up in the
             * AST, so we need to look at the token to verify that there's no
             * dangling comma.
             */
            if (arrayLiteral) {

                var lastToken = context.getLastToken(node),
                    nextToLastToken = context.getTokenBefore(lastToken);

                if (isComma(nextToLastToken)) {
                    validateCommaItemSpacing(
                        context.getTokenBefore(nextToLastToken),
                        nextToLastToken,
                        lastToken,
                        lastToken
                    );
                }
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "VariableDeclaration": function(node) {
            validateComma(node, "declarations");
        },
        "ObjectExpression": function(node) {
            validateComma(node, "properties");
        },
        "ArrayExpression": function(node) {
            validateComma(node, "elements");
        }
    };

};

},{}],138:[function(require,module,exports){
/**
 * @fileoverview Counts the cyclomatic complexity of each function of the script. See http://en.wikipedia.org/wiki/Cyclomatic_complexity.
 * Counts the number of if, conditional, for, whilte, try, switch/case,
 * @author Patrick Brosset
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var THRESHOLD = context.options[0];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // Using a stack to store complexity (handling nested functions)
    var fns = [];

    // When parsing a new function, store it in our function stack
    function startFunction() {
        fns.push(1);
    }

    function endFunction(node) {
        var complexity = fns.pop(), name = "anonymous";

        if (node.id) {
            name = node.id.name;
        }
        if (complexity > THRESHOLD) {
            context.report(node, "Function '{{name}}' has a complexity of {{complexity}}.", { name: name, complexity: complexity });
        }
    }

    function increaseComplexity() {
        if (fns.length) {
            fns[fns.length - 1] ++;
        }
    }

    function increaseSwitchComplexity(node) {
        // Avoiding `default`
        if (node.test) {
            increaseComplexity(node);
        }
    }

    function increaseLogicalComplexity(node) {
        // Avoiding &&
        if (node.operator === "||") {
            increaseComplexity(node);
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": startFunction,
        "FunctionExpression": startFunction,
        "ArrowFunctionExpression": startFunction,
        "FunctionDeclaration:exit": endFunction,
        "FunctionExpression:exit": endFunction,
        "ArrowFunctionExpression:exit": endFunction,

        "CatchClause": increaseComplexity,
        "ConditionalExpression": increaseComplexity,
        "LogicalExpression": increaseLogicalComplexity,
        "ForStatement": increaseComplexity,
        "ForInStatement": increaseComplexity,
        "ForOfStatement": increaseComplexity,
        "IfStatement": increaseComplexity,
        "SwitchCase": increaseSwitchComplexity,
        "WhileStatement": increaseComplexity,
        "DoWhileStatement": increaseComplexity
    };

};

},{}],139:[function(require,module,exports){
/**
 * @fileoverview Rule to flag consistent return values
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var functions = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Marks entrance into a function by pushing a new object onto the functions
     * stack.
     * @returns {void}
     * @private
     */
    function enterFunction() {
        functions.push({});
    }

    /**
     * Marks exit of a function by popping off the functions stack.
     * @returns {void}
     * @private
     */
    function exitFunction() {
        functions.pop();
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program": enterFunction,
        "FunctionDeclaration": enterFunction,
        "FunctionExpression": enterFunction,
        "ArrowFunctionExpression": enterFunction,

        "Program:exit": exitFunction,
        "FunctionDeclaration:exit": exitFunction,
        "FunctionExpression:exit": exitFunction,
        "ArrowFunctionExpression:exit": exitFunction,

        "ReturnStatement": function(node) {

            var returnInfo = functions[functions.length - 1],
                returnTypeDefined = "type" in returnInfo;

            if (returnTypeDefined) {

                if (returnInfo.type !== !!node.argument) {
                    context.report(node, "Expected " + (returnInfo.type ? "a" : "no") + " return value.");
                }

            } else {
                returnInfo.type = !!node.argument;
            }

        }
    };

};

},{}],140:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce consistent naming of "this" context variables
 * @author Raphael Pigulla
 * @copyright 2015 Timothy Jones. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var alias = context.options[0];

    /**
     * Reports that a variable declarator or assignment expression is assigning
     * a non-'this' value to the specified alias.
     * @param {ASTNode} node - The assigning node.
     * @returns {void}
     */
    function reportBadAssignment(node) {
        context.report(node,
            "Designated alias '{{alias}}' is not assigned to 'this'.",
            { alias: alias });
    }

    /**
     * Checks that an assignment to an identifier only assigns 'this' to the
     * appropriate alias, and the alias is only assigned to 'this'.
     * @param {ASTNode} node - The assigning node.
     * @param {Identifier} name - The name of the variable assigned to.
     * @param {Expression} value - The value of the assignment.
     * @returns {void}
     */
    function checkAssignment(node, name, value) {
        var isThis = value.type === "ThisExpression";

        if (name === alias) {
            if (!isThis || node.operator && node.operator !== "=") {
                reportBadAssignment(node);
            }
        } else if (isThis) {
            context.report(node,
                "Unexpected alias '{{name}}' for 'this'.", { name: name });
        }
    }

    /**
     * Ensures that a variable declaration of the alias in a program or function
     * is assigned to the correct value.
     * @returns {void}
     */
    function ensureWasAssigned() {
        var scope = context.getScope();

        scope.variables.some(function (variable) {
            var lookup;

            if (variable.name === alias) {
                if (variable.defs.some(function (def) {
                    return def.node.type === "VariableDeclarator" &&
                        def.node.init !== null;
                })) {
                    return true;
                }

                lookup = scope.type === "global" ? scope : variable;

                // The alias has been declared and not assigned: check it was
                // assigned later in the same scope.
                if (!lookup.references.some(function (reference) {
                    var write = reference.writeExpr;

                    if (reference.from === scope &&
                            write && write.type === "ThisExpression" &&
                            write.parent.operator === "=") {
                        return true;
                    }
                })) {
                    variable.defs.map(function (def) {
                        return def.node;
                    }).forEach(reportBadAssignment);
                }

                return true;
            }
        });
    }

    return {
        "Program:exit": ensureWasAssigned,
        "FunctionExpression:exit": ensureWasAssigned,
        "FunctionDeclaration:exit": ensureWasAssigned,

        "VariableDeclarator": function (node) {
            if (node.init !== null) {
                checkAssignment(node, node.id.name, node.init);
            }
        },

        "AssignmentExpression": function (node) {
            if (node.left.type === "Identifier") {
                checkAssignment(node, node.left.name, node.right);
            }
        }
    };

};

},{}],141:[function(require,module,exports){
/**
 * @fileoverview Rule to flag statements without curly braces
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var multiOnly = (context.options[0] === "multi");
    var multiLine = (context.options[0] === "multi-line");

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determines if a given node is a one-liner that's on the same line as it's preceding code.
     * @param {ASTNode} node The node to check.
     * @returns {boolean} True if the node is a one-liner that's on the same line as it's preceding code.
     * @private
     */
    function isCollapsedOneLiner(node) {
        var before = context.getTokenBefore(node),
            last = context.getLastToken(node);
        return before.loc.start.line === last.loc.end.line;
    }

    /**
     * Checks the body of a node to see if it's a block statement. Depending on
     * the rule options, reports the appropriate problems.
     * @param {ASTNode} node The node to report if there's a problem.
     * @param {ASTNode} body The body node to check for blocks.
     * @param {string} name The name to report if there's a problem.
     * @param {string} suffix Additional string to add to the end of a report.
     * @returns {void}
     */
    function checkBody(node, body, name, suffix) {
        var hasBlock = (body.type === "BlockStatement");

        if (multiOnly) {
            if (hasBlock && body.body.length === 1) {
                context.report(node, "Unnecessary { after '{{name}}'{{suffix}}.",
                    {
                        name: name,
                        suffix: (suffix ? " " + suffix : "")
                    }
                );
            }
        } else if (multiLine) {
            if (!hasBlock && !isCollapsedOneLiner(body)) {
                context.report(node, "Expected { after '{{name}}'{{suffix}}.",
                    {
                        name: name,
                        suffix: (suffix ? " " + suffix : "")
                    }
                );
            }
        } else {
            if (!hasBlock) {
                context.report(node, "Expected { after '{{name}}'{{suffix}}.",
                    {
                        name: name,
                        suffix: (suffix ? " " + suffix : "")
                    }
                );
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "IfStatement": function(node) {

            checkBody(node, node.consequent, "if", "condition");

            if (node.alternate && node.alternate.type !== "IfStatement") {
                checkBody(node, node.alternate, "else");
            }

        },

        "WhileStatement": function(node) {
            checkBody(node, node.body, "while", "condition");
        },

        "DoWhileStatement": function (node) {
            checkBody(node, node.body, "do");
        },

        "ForStatement": function(node) {
            checkBody(node, node.body, "for", "condition");
        }
    };

};

},{}],142:[function(require,module,exports){
/**
 * @fileoverview require default case in switch statements
 * @author Aliaksei Shytkin
 */
"use strict";

var COMMENT_VALUE = "no default";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Shortcut to get last element of array
     * @param  {*[]} collection Array
     * @returns {*} Last element
     */
    function last(collection) {
        return collection[collection.length - 1];
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "SwitchStatement": function(node) {

            if (!node.cases.length) {
                // skip check of empty switch because there is no easy way
                // to extract comments inside it now
                return;
            }

            var hasDefault = node.cases.some(function(v) {
                return v.test === null;
            });

            if (!hasDefault) {

                var comment;
                var comments;

                var lastCase = last(node.cases);
                comments = context.getComments(lastCase).trailing;

                if (comments.length) {
                    comment = last(comments);
                }

                if (!comment || comment.value.trim() !== COMMENT_VALUE) {
                    context.report(node, "Expected a default case.");
                }
            }
        }
    };
};

},{}],143:[function(require,module,exports){
/**
 * @fileoverview Rule to warn about using dot notation instead of square bracket notation when possible.
 * @author Josh Perez
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
var keywords = [
    "this",
    "function",
    "if",
    "return",
    "var",
    "else",
    "for",
    "new",
    "arguments",
    "in",
    "typeof",
    "while",
    "case",
    "break",
    "try",
    "catch",
    "delete",
    "throw",
    "switch",
    "continue",
    "default",
    "instanceof",
    "do",
    "void",
    "finally",
    "with",
    "debugger",
    "eval",
    "implements",
    "interface",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield",
    "let",
    "class",
    "enum",
    "export",
    "extends",
    "import",
    "super",
    "true",
    "false",
    "null",
    "abstract",
    "boolean",
    "byte",
    "char",
    "const",
    "double",
    "final",
    "float",
    "goto",
    "int",
    "long",
    "native",
    "short",
    "synchronized",
    "throws",
    "transient",
    "volatile"
];

module.exports = function(context) {
    var options = context.options[0] || {};
    var allowKeywords = options.allowKeywords === void 0 || !!options.allowKeywords;

    var allowPattern;
    if (options.allowPattern) {
        allowPattern = new RegExp(options.allowPattern);
    }

    return {
        "MemberExpression": function(node) {
            if (
                node.computed &&
                node.property.type === "Literal" &&
                validIdentifier.test(node.property.value) &&
                (allowKeywords || keywords.indexOf("" + node.property.value) === -1)
            ) {
                if (!(allowPattern && allowPattern.test(node.property.value))) {
                    context.report(node, "[" + JSON.stringify(node.property.value) + "] is better written in dot notation.");
                }
            }
            if (
                !allowKeywords &&
                !node.computed &&
                keywords.indexOf("" + node.property.name) !== -1
            ) {
                context.report(node, "." + node.property.name + " is a syntax error.");
            }
        }
    };
};

},{}],144:[function(require,module,exports){
/**
 * @fileoverview Require file to end with single newline.
 * @author Nodeca Team <https://github.com/nodeca>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program": function checkBadEOF(node) {
            // Get the whole source code, not for node only.
            var src = context.getSource(), location = {column: 1};

            if (src.length === 0) {
                return;
            }

            if (src[src.length - 1] !== "\n") {
                // file is not newline-terminated
                location.line = src.split(/\n/g).length;
                context.report(node, location, "Newline required at end of file but not found.");
            }
        }

    };

};

},{}],145:[function(require,module,exports){
/**
 * @fileoverview Rule to flag statements that use != and == instead of !== and ===
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Checks if an expression is a typeof expression
     * @param  {ASTNode} node The node to check
     * @returns {boolean} if the node is a typeof expression
     */
    function isTypeOf(node) {
        return node.type === "UnaryExpression" && node.operator === "typeof";
    }

    /**
     * Checks if either operand of a binary expression is a typeof operation
     * @param {ASTNode} node The node to check
     * @returns {boolean} if one of the operands is typeof
     * @private
     */
    function isTypeOfBinary(node) {
        return isTypeOf(node.left) || isTypeOf(node.right);
    }

    /**
     * Checks if operands are literals of the same type (via typeof)
     * @param {ASTNode} node The node to check
     * @returns {boolean} if operands are of same type
     * @private
     */
    function areLiteralsAndSameType(node) {
        return node.left.type === "Literal" && node.right.type === "Literal" &&
                typeof node.left.value === typeof node.right.value;
    }

    /**
     * Checks if one of the operands is a literal null
     * @param {ASTNode} node The node to check
     * @returns {boolean} if operands are null
     * @private
     */
    function isNullCheck(node) {
        return (node.right.type === "Literal" && node.right.value === null) ||
                (node.left.type === "Literal" && node.left.value === null);
    }

    /**
     * Gets the location (line and column) of the binary expression's operator
     * @param {ASTNode} node The binary expression node to check
     * @param {String} operator The operator to find
     * @returns {Object} { line, column } location of operator
     * @private
     */
    function getOperatorLocation(node) {
        var opToken = context.getTokenAfter(node.left);
        return {line: opToken.loc.start.line, column: opToken.loc.start.column};
    }

    return {
        "BinaryExpression": function(node) {
            if (node.operator !== "==" && node.operator !== "!=") {
                return;
            }

            if (context.options[0] === "smart" && (isTypeOfBinary(node) ||
                    areLiteralsAndSameType(node)) || isNullCheck(node)) {
                return;
            }

            if (context.options[0] === "allow-null" && isNullCheck(node)) {
                return;
            }

            context.report(
                node, getOperatorLocation(node),
                "Expected '{{op}}=' and instead saw '{{op}}'.",
                {op: node.operator}
            );
        }
    };

};

},{}],146:[function(require,module,exports){
/**
 * @fileoverview Rule to warn when a function expression does not have a name.
 * @author Kyle T. Nunery
 * @copyright 2015 Brandon Mills. All rights reserved.
 * @copyright 2014 Kyle T. Nunery. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Determines whether the current FunctionExpression node is a get, set, or
     * shorthand method in an object literal.
     * @returns {boolean} True if the node is a get, set, or shorthand method.
     */
    function isObjectMethod() {
        var parent = context.getAncestors().pop();
        return (parent.type === "Property" && (
            parent.method ||
            parent.kind === "get" ||
            parent.kind === "set"
        ));
    }

    return {
        "FunctionExpression": function(node) {

            var name = node.id && node.id.name;

            if (!name && !isObjectMethod()) {
                context.report(node, "Missing function expression name.");
            }
        }
    };
};

},{}],147:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce a particular function style
 * @author Nicholas C. Zakas
 * @copyright 2013 Nicholas C. Zakas. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var style = context.options[0],
        enforceDeclarations = (style === "declaration");

    return {

        "FunctionDeclaration": function(node) {
            if (!enforceDeclarations) {
                context.report(node, "Expected a function expression.");
            }
        },

        "FunctionExpression": function() {
            var parent = context.getAncestors().pop();

            if (enforceDeclarations && parent.type === "VariableDeclarator") {
                context.report(parent, "Expected a function declaration.");
            }
        },

        "ArrowFunctionExpression": function() {
            var parent = context.getAncestors().pop();

            if (enforceDeclarations && parent.type === "VariableDeclarator") {
                context.report(parent, "Expected a function declaration.");
            }
        }

    };

};

},{}],148:[function(require,module,exports){
/**
 * @fileoverview Rule to check for the position of the * in your generator functions
 * @author Jamund Ferguson
 * @copyright 2014 Jamund Ferguson. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var position = context.options[0] || "end";

    /**
     * Check the position of the star compared to the expected position.
     * @param {ASTNode} node - the entire function node
     * @returns {void}
     */
    function checkStarPosition(node) {
        var starToken;

        if (!node.generator) {
            return;
        }

        // Blocked, pending decision to fix or work around in eslint/espree#36
        if (context.getAncestors().pop().method) {
            return;
        }

        starToken = context.getFirstToken(node, 1);

        // check for function *name() {}
        if (position === "end") {

            // * starts where the next identifier begins
            if (starToken.range[1] !== context.getTokenAfter(starToken).range[0]) {
                context.report(node, "Expected a space before *.");
            }
        }

        // check for function* name() {}
        if (position === "start") {

            // * begins where the previous identifier ends
            if (starToken.range[0] !== context.getTokenBefore(starToken).range[1]) {
                context.report(node, "Expected no space before *.");
            }
        }

        // check for function * name() {}
        if (position === "middle") {

            // must be a space before and afer the *
            if (starToken.range[0] <= context.getTokenBefore(starToken).range[1] ||
                starToken.range[1] >= context.getTokenAfter(starToken).range[0]) {
                context.report(node, "Expected spaces around *.");
            }
        }
    }

    return {
        "FunctionDeclaration": checkStarPosition,
        "FunctionExpression": checkStarPosition
    };

};

},{}],149:[function(require,module,exports){
/**
 * @fileoverview Rule to flag or require global strict mode.
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var mode = context.options[0];

    if (mode === "always") {

        return {
            "Program": function(node) {
                if (node.body.length > 0) {
                    var statement = node.body[0];

                    if (!(statement.type === "ExpressionStatement" && statement.expression.value === "use strict")) {
                        context.report(node, "Use the global form of \"use strict\".");
                    }
                }
            }
        };

    } else { // mode = "never"

        return {
            "ExpressionStatement": function(node) {
                var parent = context.getAncestors().pop();

                if (node.expression.value === "use strict" && parent.type === "Program") {
                    context.report(node, "Use the function form of \"use strict\".");
                }
            }
        };

    }

};

},{}],150:[function(require,module,exports){
/**
 * @fileoverview Rule to flag for-in loops without if statements inside
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "ForInStatement": function(node) {

            /*
             * If the for-in statement has {}, then the real body is the body
             * of the BlockStatement. Otherwise, just use body as provided.
             */
            var body = node.body.type === "BlockStatement" ? node.body.body[0] : node.body;

            if (body && body.type !== "IfStatement") {
                context.report(node, "The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype.");
            }
        }
    };

};

},{}],151:[function(require,module,exports){
/**
 * @fileoverview Ensure handling of errors when we know they exist.
 * @author Jamund Ferguson
 * @copyright 2014 Jamund Ferguson. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var errorArgument = context.options[0] || "err";
    var callbacks = [];
    var scopes = 0;

    /**
     * Checks if the given argument should be interpreted as a regexp pattern.
     * @param {string} stringToCheck The string which should be checked.
     * @returns {boolean} Whether or not the string should be interpreted as a pattern.
     */
    function isPattern(stringToCheck) {
        var firstChar = stringToCheck[0];
        return firstChar === "^";
    }

    /**
     * Checks if the given name matches the configured error argument.
     * @param {string} name The name which should be compared.
     * @returns {boolean} Whether or not the given name matches the configured error variable name.
     */
    function matchesConfiguredErrorName(name) {
        if (isPattern(errorArgument)) {
            var regexp = new RegExp(errorArgument);
            return regexp.test(name);
        }
        return name === errorArgument;
    }

    /**
     * Check the arguments to see if we need to start tracking the error object.
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     */
    function startFunction(node) {

        // keep track of nested scopes
        scopes++;

        // check if the first argument matches our argument name
        var firstArg = node.params && node.params[0];
        if (firstArg && matchesConfiguredErrorName(firstArg.name)) {
            callbacks.push({handled: false, depth: scopes, errorVariableName: firstArg.name});
        }
    }

    /**
     * At the end of a function check to see if the error was handled.
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     */
    function endFunction(node) {

        var callback = callbacks[callbacks.length - 1] || {};

        // check if a callback is ending, if so pop it off the stack
        if (callback.depth === scopes) {
            callbacks.pop();

            // check if there were no handled errors since the last callback
            if (!callback.handled) {
                context.report(node, "Expected error to be handled.");
            }
        }

        // less nested functions
        scopes--;

    }

    /**
     * Check to see if we're handling the error object properly.
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     */
    function checkForError(node) {
        if (callbacks.length > 0) {
            var callback = callbacks[callbacks.length - 1] || {};

            // make sure the node's name matches our error argument name
            var isAboutError = node.name === callback.errorVariableName;

            // we don't consider these use cases as "handling" the error
            var doNotCount = ["FunctionDeclaration", "ArrowFunctionExpression", "FunctionExpression", "CatchClause"];

            // make sure this identifier isn't used as part of one of them
            var isHandled = doNotCount.indexOf(node.parent.type) === -1;

            if (isAboutError && isHandled) {
                // record that this callback handled its error
                callback.handled = true;
            }
        }
    }

    return {
        "FunctionDeclaration": startFunction,
        "FunctionExpression": startFunction,
        "ArrowFunctionExpression": startFunction,
        "Identifier": checkForError,
        "FunctionDeclaration:exit": endFunction,
        "FunctionExpression:exit": endFunction,
        "ArrowFunctionExpression:exit": endFunction
    };

};

},{}],152:[function(require,module,exports){
/**
 * @fileoverview This option sets a specific tab width for your code
 * This rule has been ported and modified from JSCS.
 * @author Dmitriy Shekhovtsov
 * @copyright 2015 Dmitriy Shekhovtsov. All rights reserved.
 * @copyright 2013 Dulin Marat and other contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*eslint no-use-before-define:[2, "nofunc"]*/
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    // indentation defaults: 4 spaces
    var indentChar = " ";
    var indentSize = 4;
    var options = {indentSwitchCase: false};

    var lines = null;
    var indentStack = [0];
    var linesToCheck = null;
    var breakIndents = null;

    if (context.options.length) {
        if (context.options[0] === "tab") {
            indentChar = "\t";
            indentSize = 1;
        } else if (typeof context.options[0] === "number") {
            indentSize = context.options[0];
        }

        if (context.options[1]) {
            var opts = context.options[1];
            options.indentSwitchCase = opts.indentSwitchCase === true;
        }
    }

    var blockParents = [
        "IfStatement",
        "WhileStatement",
        "DoWhileStatement",
        "ForStatement",
        "ForInStatement",
        "ForOfStatement",
        "FunctionDeclaration",
        "FunctionExpression",
        "ArrowExpression",
        "CatchClause",
        "WithStatement"
    ];

    var indentableNodes = {
        BlockStatement: "body",
        Program: "body",
        ObjectExpression: "properties",
        ArrayExpression: "elements",
        SwitchStatement: "cases"
    };

    if (options.indentSwitchCase) {
        indentableNodes.SwitchCase = "consequent";
    }

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Mark line to be checked
     * @param {Number} line - line number
     * @returns {void}
     */
    function markCheckLine(line) {
        linesToCheck[line].check = true;
    }

    /**
     * Mark line with targeted node to be checked
     * @param {ASTNode} checkNode - targeted node
     * @returns {void}
     */
    function markCheck(checkNode) {
        markCheckLine(checkNode.loc.start.line - 1);
    }

    /**
     * Sets pushing indent of current node
     * @param {ASTNode} node - targeted node
     * @param {Number} indents - indents count to push
     * @returns {void}
     */
    function markPush(node, indents) {
        linesToCheck[node.loc.start.line - 1].push.push(indents);
    }

    /**
     * Marks line as outdent, end of block statement for example
     * @param {ASTNode} node - targeted node
     * @param {Number} outdents - count of outedents in targeted line
     * @returns {void}
     */
    function markPop(node, outdents) {
        linesToCheck[node.loc.end.line - 1].pop.push(outdents);
    }

    /**
     * Set alt push for current node
     * @param {ASTNode} node - targeted node
     * @returns {void}
     */
    function markPushAlt(node) {
        linesToCheck[node.loc.start.line - 1].pushAltLine.push(node.loc.end.line - 1);
    }

    /**
     * Marks end of node block to be checked
     * and marks targeted node as indent pushing
     * @param {ASTNode} pushNode - targeted node
     * @param {Number} indents - indent count to push
     * @returns {void}
     */
    function markPushAndEndCheck(pushNode, indents) {
        markPush(pushNode, indents);
        markCheckLine(pushNode.loc.end.line - 1);
    }

    /**
     * Mark node as switch case statement
     * and set push\pop indentation changes
     * @param {ASTNode} caseNode - targeted node
     * @param {ASTNode[]} children - consequent child nodes of case node
     * @returns {void}
     */
    function markCase(caseNode, children) {
        var outdentNode = getCaseOutdent(children);

        if (outdentNode) {
            // If a case statement has a `break` as a direct child and it is the
            // first one encountered, use it as the example for all future case indentation
            if (breakIndents === null) {
                breakIndents = (caseNode.loc.start.column === outdentNode.loc.start.column) ? 1 : 0;
            }
            markPop(outdentNode, breakIndents);
        } else {
            markPop(caseNode, 0);
        }
    }

    /**
     * Mark child nodes to be checked later of targeted node,
     * only if child node not in same line as targeted one
     * (if child and parent nodes wrote in single line)
     * @param {ASTNode} node - targeted node
     * @returns {void}
     */
    function markChildren(node) {
        getChildren(node).forEach(function(childNode) {
            if (childNode.loc.start.line !== node.loc.start.line || node.type === "Program") {
                markCheck(childNode);
            }
        });
    }

    /**
     * Mark child block as scope pushing and mark to check
     * @param {ASTNode} node - target node
     * @param {String} property - target node property containing child
     * @returns {void}
     */
    function markAlternateBlockStatement(node, property) {
        var child = node[property];
        if (child && child.type === "BlockStatement") {
            markCheck(child);
        }
    }

    /**
     * Checks whether node is multiline or single line
     * @param {ASTNode} node - target node
     * @returns {boolean} - is multiline node
     */
    function isMultiline(node) {
        return node.loc.start.line !== node.loc.end.line;
    }

    /**
     * Get switch case statement outdent node if any
     * @param {ASTNode[]} caseChildren - case statement childs
     * @returns {ASTNode} - outdent node
     */
    function getCaseOutdent(caseChildren) {
        var outdentNode;
        caseChildren.some(function(node) {
            if (node.type === "BreakStatement") {
                outdentNode = node;
                return true;
            }
        });

        return outdentNode;
    }

    /**
     * Returns block containing node
     * @param {ASTNode} node - targeted node
     * @returns {ASTNode} - block node
     */
    function getBlockNodeToMark(node) {
        var parent = node.parent;

        // The parent of an else is the entire if/else block. To avoid over indenting
        // in the case of a non-block if with a block else, mark push where the else starts,
        // not where the if starts!
        if (parent.type === "IfStatement" && parent.alternate === node) {
            return node;
        }

        // The end line to check of a do while statement needs to be the location of the
        // closing curly brace, not the while statement, to avoid marking the last line of
        // a multiline while as a line to check.
        if (parent.type === "DoWhileStatement") {
            return node;
        }

        // Detect bare blocks: a block whose parent doesn"t expect blocks in its syntax specifically.
        if (blockParents.indexOf(parent.type) === -1) {
            return node;
        }

        return parent;
    }

    /**
     * Get node's children
     * @param {ASTNode} node - current node
     * @returns {ASTNode[]} - children
     */
    function getChildren(node) {
        var childrenProperty = indentableNodes[node.type];
        return node[childrenProperty];
    }

    /**
     * Gets indentation in line `i`
     * @param {Number} i - number of line to get indentation
     * @returns {Number} - count of indentation symbols
     */
    function getIndentationFromLine(i) {
        var rNotIndentChar = new RegExp("[^" + indentChar + "]");
        var firstContent = lines[i].search(rNotIndentChar);
        if (firstContent === -1) {
            firstContent = lines[i].length;
        }
        return firstContent;
    }

    /**
     * Compares expected and actual indentation
     * and reports any violations
     * @param {ASTNode} node - node used only for reporting
     * @returns {void}
     */
    function checkIndentations(node) {
        linesToCheck.forEach(function(line, i) {
            var actualIndentation = getIndentationFromLine(i);
            var expectedIndentation = getExpectedIndentation(line, actualIndentation);

            if (line.check) {

                if (actualIndentation !== expectedIndentation) {
                    context.report(node,
                        {line: i + 1, column: expectedIndentation},
                        "Expected indentation of " + expectedIndentation + " characters.");
                    // correct the indentation so that future lines
                    // can be validated appropriately
                    actualIndentation = expectedIndentation;
                }
            }

            if (line.push.length) {
                pushExpectedIndentations(line, actualIndentation);
            }
        });
    }

    /**
     * Counts expected indentation for given line number
     * @param {Number} line - line number
     * @param {Number} actual - actual indentation
     * @returns {number} - expected indentation
     */
    function getExpectedIndentation(line, actual) {
        var outdent = indentSize * Math.max.apply(null, line.pop);

        var idx = indentStack.length - 1;
        var expected = indentStack[idx];

        if (!Array.isArray(expected)) {
            expected = [expected];
        }

        expected = expected.map(function(value) {
            if (line.pop.length) {
                value -= outdent;
            }

            return value;
        }).reduce(function(previous, current) {
            // when the expected is an array, resolve the value
            // back into a Number by checking both values are the actual indentation
            return actual === current ? current : previous;
        });

        indentStack[idx] = expected;

        line.pop.forEach(function() {
            indentStack.pop();
        });

        return expected;
    }

    /**
     * Store in stack expected indentations
     * @param {Number} line - current line
     * @param {Number} actualIndentation - actual indentation at current line
     * @returns {void}
     */
    function pushExpectedIndentations(line, actualIndentation) {
        var indents = Math.max.apply(null, line.push);
        var expected = actualIndentation + (indentSize * indents);

        // when a line has alternate indentations, push an array of possible values
        // on the stack, to be resolved when checked against an actual indentation
        if (line.pushAltLine.length) {
            expected = [expected];
            line.pushAltLine.forEach(function(altLine) {
                expected.push(getIndentationFromLine(altLine) + (indentSize * indents));
            });
        }

        line.push.forEach(function() {
            indentStack.push(expected);
        });
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Program": function (node) {
            lines = context.getSourceLines();
            linesToCheck = lines.map(function () {
                return {
                    push: [],
                    pushAltLine: [],
                    pop: [],
                    check: false
                };
            });

            if (!isMultiline(node)) {
                return;
            }

            markChildren(node);
        },
        "Program:exit": function (node) {
            checkIndentations(node);
        },

        "BlockStatement": function (node) {
            if (!isMultiline(node)) {
                return;
            }

            markChildren(node);
            markPop(node, 1);

            markPushAndEndCheck(getBlockNodeToMark(node), 1);
        },

        "IfStatement": function (node) {
            markAlternateBlockStatement(node, "alternate");
        },

        "TryStatement": function (node) {
            markAlternateBlockStatement(node, "handler");
            markAlternateBlockStatement(node, "finalizer");
        },

        "SwitchStatement": function (node) {
            if (!isMultiline(node)) {
                return;
            }

            var indents = 1;
            var children = getChildren(node);

            if (node.loc.start.column === children[0].loc.start.column) {
                indents = 0;
            }

            markChildren(node);
            markPop(node, indents);
            markPushAndEndCheck(node, indents);
        },

        "SwitchCase": function (node) {
            if (!options.indentSwitchCase) {
                return;
            }

            if (!isMultiline(node)) {
                return;
            }

            var children = getChildren(node);

            if (children.length === 1 && children[0].type === "BlockStatement") {
                return;
            }

            markPush(node, 1);
            markCheck(node);
            markChildren(node);

            markCase(node, children);
        },

        // indentations inside of function expressions can be offset from
        // either the start of the function or the end of the function, therefore
        // mark all starting lines of functions as potential indentations
        "FunctionDeclaration": function (node) {
            markPushAlt(node);
        },
        "FunctionExpression": function (node) {
            markPushAlt(node);
        }
    };

};

},{}],153:[function(require,module,exports){
/**
 * @fileoverview Rule to specify spacing of object literal keys and values
 * @author Brandon Mills
 * @copyright 2014 Brandon Mills. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks whether a string contains a line terminator as defined in
 * http://www.ecma-international.org/ecma-262/5.1/#sec-7.3
 * @param {string} str String to test.
 * @returns {boolean} True if str contains a line terminator.
 */
function containsLineTerminator(str) {
    return /[\n\r\u2028\u2029]/.test(str);
}

/**
 * Gets an object literal property's key as the identifier name or string value.
 * @param {ASTNode} property Property node whose key to retrieve.
 * @returns {string} The property's key.
 */
function getKey(property) {
    return property.key.name || property.key.value;
}

/**
 * Gets the number of characters in a key, including quotes around string keys.
 * @param {ASTNode} property Property of on object literal.
 * @returns {int} Width of the key, including string quotes where present.
 */
function getKeyWidth(property) {
    var key = property.key;
    return (key.type === "Identifier" ? key.name : key.raw).length;
}

/**
 * Gets the last element of an array.
 * @param {Array} arr An array.
 * @returns {any} Last element of arr.
 */
function last(arr) {
    return arr[arr.length - 1];
}

/**
 * Checks whether a property is a member of the property group it follows.
 * @param {ASTNode} lastMember The last Property known to be in the group.
 * @param {ASTNode} candidate The next Property that might be in the group.
 * @returns {boolean} True if the candidate property is part of the group.
 */
function continuesPropertyGroup(lastMember, candidate) {
    var groupEndLine = lastMember.loc.end.line,
        candidateStartLine = candidate.loc.start.line,
        comments, i;

    if (candidateStartLine - groupEndLine <= 1) {
        return true;
    }

    // Check that the first comment is adjacent to the end of the group, the
    // last comment is adjacent to the candidate property, and that successive
    // comments are adjacent to each other.
    comments = candidate.leadingComments;
    if (
        comments &&
        comments[0].loc.start.line - groupEndLine <= 1 &&
        candidateStartLine - last(comments).loc.end.line <= 1
    ) {
        for (i = 1; i < comments.length; i++) {
            if (comments[i].loc.start.line - comments[i - 1].loc.end.line > 1) {
                return false;
            }
        }
        return true;
    }

    return false;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var messages = {
    key: "{{error}} space after key \"{{key}}\".",
    value: "{{error}} space before value for key \"{{key}}\"."
};

module.exports = function(context) {

    /**
     * OPTIONS
     * "key-spacing": [2, {
     *     beforeColon: false,
     *     afterColon: true,
     *     align: "colon" // Optional, or "value"
     * }
     */

    var options = context.options[0] || {},
        align = options.align,
        beforeColon = +!!options.beforeColon, // Defaults to false
        afterColon = +!(options.afterColon === false); // Defaults to true

    /**
     * Gets the whitespace around the colon in an object literal property.
     * @param {ASTNode} property Property node from an object literal.
     * @returns {Object} Whitespace before and after the property's colon.
     */
    function getPropertyWhitespace(property) {
        var whitespace = /^(\s*):(\s*)/.exec(context.getSource().slice(
            property.key.range[1], property.value.range[0]
        ));

        if (whitespace) {
            return {
                beforeColon: whitespace[1],
                afterColon: whitespace[2]
            };
        }
    }

    /**
     * Reports an appropriately-formatted error if spacing is incorrect on one
     * side of the colon.
     * @param {ASTNode} property Key-value pair in an object literal.
     * @param {string} side Side being verified - either "key" or "value".
     * @param {string} whitespace Actual whitespace string.
     * @param {int} expected Expected whitespace length.
     * @returns {void}
     */
    function report(property, side, whitespace, expected) {
        var diff = whitespace.length - expected,
            key = property.key,
            firstTokenAfterColon = context.getTokenAfter(key, 1),
            location = side === "key" ? key.loc.start : firstTokenAfterColon.loc.start;

        if (diff && !(expected && containsLineTerminator(whitespace))) {
            context.report(property[side], location, messages[side], {
                error: diff > 0 ? "Extra" : "Missing",
                key: getKey(property)
            });
        }
    }

    /**
     * Verifies correct vertical alignment of a group of properties.
     * @param {ASTNode[]} properties List of Property AST nodes.
     * @returns {void}
     */
    function verifyAlignment(properties) {
        var length = properties.length,
            widths = properties.map(getKeyWidth), // Width of keys, including quotes
            targetWidth = Math.max.apply(null, widths),
            i, property, whitespace, width;

        // Conditionally include one space before or after colon
        targetWidth += (align === "colon" ? beforeColon : afterColon);

        for (i = 0; i < length; i++) {
            property = properties[i];
            whitespace = getPropertyWhitespace(property);

            if (!whitespace) {
                continue; // Object literal getters/setters lack a colon
            }

            width = widths[i];

            if (align === "value") {
                report(property, "key", whitespace.beforeColon, beforeColon);
                report(property, "value", whitespace.afterColon, targetWidth - width);
            } else { // align = "colon"
                report(property, "key", whitespace.beforeColon, targetWidth - width);
                report(property, "value", whitespace.afterColon, afterColon);
            }
        }
    }

    if (align) { // Verify vertical alignment

        return {
            "ObjectExpression": function(node) {
                node.properties.reduce(function(groups, property) {
                    var currentGroup = last(groups),
                        prev = last(currentGroup);

                    if (!prev || continuesPropertyGroup(prev, property)) {
                        currentGroup.push(property);
                    } else {
                        groups.push([property]);
                    }

                    return groups;
                }, [[]]).forEach(function(group) {
                    verifyAlignment(group);
                });
            }
        };

    } else { // Strictly obey beforeColon and afterColon in each property

        return {
            "Property": function (node) {
                var whitespace = getPropertyWhitespace(node);
                if (whitespace) { // Object literal getters/setters lack colons
                    report(node, "key", whitespace.beforeColon, beforeColon);
                    report(node, "value", whitespace.afterColon, afterColon);
                }
            }
        };

    }

};

},{}],154:[function(require,module,exports){
/**
 * @fileoverview A rule to set the maximum depth block can be nested in a function.
 * @author Ian Christian Myers
 * @copyright 2013 Ian Christian Myers. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    var functionStack = [],
        maxDepth = context.options[0] || 4;

    function startFunction() {
        functionStack.push(0);
    }

    function endFunction() {
        functionStack.pop();
    }

    function pushBlock(node) {
        var len = ++functionStack[functionStack.length - 1];

        if (len > maxDepth) {
            context.report(node, "Blocks are nested too deeply ({{depth}}).",
                    { depth: len });
        }
    }

    function popBlock() {
        functionStack[functionStack.length - 1]--;
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "Program": startFunction,
        "FunctionDeclaration": startFunction,
        "FunctionExpression": startFunction,
        "ArrowFunctionExpression": startFunction,

        "IfStatement": function(node) {
            if (node.parent.type !== "IfStatement") {
                pushBlock(node);
            }
        },
        "SwitchStatement": pushBlock,
        "TryStatement": pushBlock,
        "DoWhileStatement": pushBlock,
        "WhileStatement": pushBlock,
        "WithStatement": pushBlock,
        "ForStatement": pushBlock,
        "ForInStatement": pushBlock,
        "ForOfStatement": pushBlock,

        "IfStatement:exit": popBlock,
        "SwitchStatement:exit": popBlock,
        "TryStatement:exit": popBlock,
        "DoWhileStatement:exit": popBlock,
        "WhileStatement:exit": popBlock,
        "WithStatement:exit": popBlock,
        "ForStatement:exit": popBlock,
        "ForInStatement:exit": popBlock,
        "ForOfStatement:exit": popBlock,

        "FunctionDeclaration:exit": endFunction,
        "FunctionExpression:exit": endFunction,
        "ArrowFunctionExpression:exit": endFunction,
        "Program:exit": endFunction
    };

};

},{}],155:[function(require,module,exports){
/**
 * @fileoverview Rule to check for max length on a line.
 * @author Matt DuVall <http://www.mattduvall.com>
 * @copyright 2013 Matt DuVall. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Creates a string that is made up of repeating a given string a certain
     * number of times. This uses exponentiation of squares to achieve significant
     * performance gains over the more traditional implementation of such
     * functionality.
     * @param {string} str The string to repeat.
     * @param {int} num The number of times to repeat the string.
     * @returns {string} The created string.
     * @private
     */
    function stringRepeat(str, num) {
        var result = "";
        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }
        return result;
    }

    var tabWidth = context.options[1];

    var maxLength = context.options[0],
        tabString = stringRepeat(" ", tabWidth);

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------
    function checkProgramForMaxLength(node) {
        var lines = context.getSourceLines();

        // Replace the tabs
        // Split (honors line-ending)
        // Iterate
        lines.forEach(function(line, i) {
            if (line.replace(/\t/g, tabString).length > maxLength) {
                context.report(node, { line: i + 1, col: 1 }, "Line " + (i + 1) + " exceeds the maximum line length of " + maxLength + ".");
            }
        });
    }


    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "Program": checkProgramForMaxLength
    };

};

},{}],156:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce a maximum number of nested callbacks.
 * @author Ian Christian Myers
 * @copyright 2013 Ian Christian Myers. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Constants
    //--------------------------------------------------------------------------

    var THRESHOLD = context.options[0];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    var callbackStack = [];

    /**
     * Checks a given function node for too many callbacks.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     * @private
     */
    function checkFunction(node) {
        var parent = node.parent;

        if (parent.type === "CallExpression") {
            callbackStack.push(node);
        }

        if (callbackStack.length > THRESHOLD) {
            var opts = {num: callbackStack.length, max: THRESHOLD};
            context.report(node, "Too many nested callbacks ({{num}}). Maximum allowed is {{max}}.", opts);
        }
    }

    /**
     * Pops the call stack.
     * @returns {void}
     * @private
     */
    function popStack() {
        callbackStack.pop();
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "ArrowFunctionExpression": checkFunction,
        "ArrowFunctionExpression:exit": popStack,

        "FunctionExpression": checkFunction,
        "FunctionExpression:exit": popStack
    };

};

},{}],157:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when a function has too many parameters
 * @author Ilya Volodin
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2013 Ilya Volodin. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var numParams = context.options[0] || 3;

    /**
     * Checks a function to see if it has too many parameters.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     * @private
     */
    function checkFunction(node) {
        if (node.params.length > numParams) {
            context.report(node, "This function has too many parameters ({{count}}). Maximum allowed is {{max}}.", {
                count: node.params.length,
                max: numParams
            });
        }
    }

    return {
        "FunctionDeclaration": checkFunction,
        "ArrowFunctionExpression": checkFunction,
        "FunctionExpression": checkFunction
    };

};

},{}],158:[function(require,module,exports){
/**
 * @fileoverview A rule to set the maximum number of statements in a function.
 * @author Ian Christian Myers
 * @copyright 2013 Ian Christian Myers. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    var functionStack = [],
        maxStatements = context.options[0] || 10;

    function startFunction() {
        functionStack.push(0);
    }

    function endFunction(node) {
        var count = functionStack.pop();

        if (count > maxStatements) {
            context.report(node, "This function has too many statements ({{count}}). Maximum allowed is {{max}}.",
                    { count: count, max: maxStatements });
        }
    }

    function countStatements(node) {
        functionStack[functionStack.length - 1] += node.body.length;
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": startFunction,
        "FunctionExpression": startFunction,
        "ArrowFunctionExpression": startFunction,

        "BlockStatement": countStatements,

        "FunctionDeclaration:exit": endFunction,
        "FunctionExpression:exit": endFunction,
        "ArrowFunctionExpression:exit": endFunction
    };

};

},{}],159:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of constructors without capital letters
 * @author Nicholas C. Zakas
 * @copyright 2014 Jordan Harband. All rights reserved.
 * @copyright 2013-2014 Nicholas C. Zakas. All rights reserved.
 */

"use strict";

var CAPS_ALLOWED = [
    "Object",
    "Function",
    "Number",
    "String",
    "Boolean",
    "Date",
    "Array",
    "Symbol",
    "RegExp"
];

/**
 * Ensure that if the key is provided, it must be an array.
 * @param {Object} obj Object to check with `key`.
 * @param {string} key Object key to check on `obj`.
 * @param {*} fallback If obj[key] is not present, this will be returned.
 * @returns {string[]} Returns obj[key] if it's an Array, otherwise `fallback`
 */
function checkArray(obj, key, fallback) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !Array.isArray(obj[key])) {
        throw new TypeError(key + ", if provided, must be an Array");
    }
    return obj[key] || fallback;
}

/**
 * A reducer function to invert an array to an Object mapping the string form of the key, to `true`.
 * @param {Object} map Accumulator object for the reduce.
 * @param {string} key Object key to set to `true`.
 * @returns {Object} Returns the updated Object for further reduction.
 */
function invert(map, key) {
    map[key] = true;
    return map;
}

/**
 * Creates an object with the cap is new exceptions as its keys and true as their values.
 * @param {Object} config Rule configuration
 * @returns {Object} Object with cap is new exceptions.
 */
function calculateCapIsNewExceptions(config) {
    var capIsNewExceptions = checkArray(config, "capIsNewExceptions", CAPS_ALLOWED);

    if (capIsNewExceptions !== CAPS_ALLOWED) {
        capIsNewExceptions = capIsNewExceptions.concat(CAPS_ALLOWED);
    }

    return capIsNewExceptions.reduce(invert, {});
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var config = context.options[0] || {};
    config.newIsCap = config.newIsCap === false ? false : true;
    config.capIsNew = config.capIsNew === false ? false : true;

    var newIsCapExceptions = checkArray(config, "newIsCapExceptions", []).reduce(invert, {});

    var capIsNewExceptions = calculateCapIsNewExceptions(config);

    var listeners = {};

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Get exact callee name from expression
     * @param {ASTNode} node CallExpression or NewExpression node
     * @returns {string} name
     */
    function extractNameFromExpression(node) {

        var name = "",
            property;

        if (node.callee.type === "MemberExpression") {
            property = node.callee.property;

            if (property.type === "Literal" && (typeof property.value === "string")) {
                name = property.value;
            } else if (property.type === "Identifier" && !node.callee.computed) {
                name = property.name;
            }
        } else {
            name = node.callee.name;
        }
        return name;
    }

    /**
     * Returns the capitalization state of the string -
     * Whether the first character is uppercase, lowercase, or non-alphabetic
     * @param {string} str String
     * @returns {string} capitalization state: "non-alpha", "lower", or "upper"
     */
    function getCap(str) {
        var firstChar = str.charAt(0);

        var firstCharLower = firstChar.toLowerCase();
        var firstCharUpper = firstChar.toUpperCase();

        if (firstCharLower === firstCharUpper) {
            // char has no uppercase variant, so it's non-alphabetic
            return "non-alpha";
        } else if (firstChar === firstCharLower) {
            return "lower";
        } else {
            return "upper";
        }
    }

    /**
     * Check if capitalization is allowed for a CallExpression
     * @param {Object} allowedMap Object mapping calleeName to a Boolean
     * @param {ASTNode} node CallExpression node
     * @param {string} calleeName Capitalized callee name from a CallExpression
     * @returns {Boolean} Returns true if the callee may be capitalized
     */
    function isCapAllowed(allowedMap, node, calleeName) {
        if (allowedMap[calleeName]) {
            return true;
        }
        if (calleeName === "UTC" && node.callee.type === "MemberExpression") {
            // allow if callee is Date.UTC
            return node.callee.object.type === "Identifier" &&
                   node.callee.object.name === "Date";
        }
        return false;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    if (config.newIsCap) {
        listeners.NewExpression = function(node) {

            var constructorName = extractNameFromExpression(node);
            if (constructorName) {
                var capitalization = getCap(constructorName);
                var isAllowed = capitalization !== "lower" || isCapAllowed(newIsCapExceptions, node, constructorName);
                if (!isAllowed) {
                    context.report(node, "A constructor name should not start with a lowercase letter.");
                }
            }
        };
    }

    if (config.capIsNew) {
        listeners.CallExpression = function(node) {

            var calleeName = extractNameFromExpression(node);
            if (calleeName) {
                var capitalization = getCap(calleeName);
                var isAllowed = capitalization !== "upper" || isCapAllowed(capIsNewExceptions, node, calleeName);
                if (!isAllowed) {
                    context.report(node, "A function with a name starting with an uppercase letter should only be used as a constructor.");
                }
            }
        };
    }

    return listeners;
};

},{}],160:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when using constructor without parentheses
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "NewExpression": function(node) {
            var tokens = context.getTokens(node);
            var prenticesTokens = tokens.filter(function(token) {
                return token.value === "(" || token.value === ")";
            });
            if (prenticesTokens.length < 2) {
                context.report(node, "Missing '()' invoking a constructor");
            }
        }
    };

};

},{}],161:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of alert, confirm, prompt
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function matchProhibited(name) {
    return name.match(/^(alert|confirm|prompt)$/);
}

function report(context, node, result) {
    context.report(node, "Unexpected {{name}}.", { name: result[1] });
}


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "CallExpression": function(node) {

            var result;

            // without window.
            if (node.callee.type === "Identifier") {

                result = matchProhibited(node.callee.name);

                if (result) {
                    report(context, node, result);
                }

            } else if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier") {

                result = matchProhibited(node.callee.property.name);

                if (result && node.callee.object.name === "window") {
                    report(context, node, result);
                }

            }

        }
    };

};

},{}],162:[function(require,module,exports){
/**
 * @fileoverview Disallow construction of dense arrays using the Array constructor
 * @author Matt DuVall <http://www.mattduvall.com/>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function check(node) {
        if (
            node.arguments.length !== 1 &&
            node.callee.type === "Identifier" &&
            node.callee.name === "Array"
        ) {
            context.report(node, "The array literal notation [] is preferrable.");
        }
    }

    return {
        "CallExpression": check,
        "NewExpression": check
    };

};

},{}],163:[function(require,module,exports){
/**
 * @fileoverview Rule to flag bitwise identifiers
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var BITWISE_OPERATORS = [
        "^", "|", "&", "<<", ">>", ">>>",
        "^=", "|=", "&=", "<<=", ">>=", ">>>=",
        "~"
    ];

    /**
     * Reports an unexpected use of a bitwise operator.
     * @param   {ASTNode} node Node which contains the bitwise operator.
     * @returns {void}
     */
    function report(node) {
        context.report(node, "Unexpected use of '{{operator}}'.", { operator: node.operator });
    }

    /**
     * Checks if the given node has a bitwise operator.
     * @param   {ASTNode} node The node to check.
     * @returns {boolean} Whether or not the node has a bitwise operator.
     */
    function hasBitwiseOperator(node) {
        return BITWISE_OPERATORS.indexOf(node.operator) !== -1;
    }

    /**
     * Report if the given node contains a bitwise operator.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     */
    function checkNodeForBitwiseOperator(node) {
        if (hasBitwiseOperator(node)) {
            report(node);
        }
    }

    return {
        "AssignmentExpression": checkNodeForBitwiseOperator,
        "BinaryExpression": checkNodeForBitwiseOperator,
        "UnaryExpression": checkNodeForBitwiseOperator
    };

};

},{}],164:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of arguments.callee and arguments.caller.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "MemberExpression": function(node) {
            var objectName = node.object.name,
                propertyName = node.property.name;

            if (objectName === "arguments" && !node.computed && propertyName && propertyName.match(/^calle[er]$/)) {
                context.report(node, "Avoid arguments.{{property}}.", { property: propertyName });
            }

        }
    };

};

},{}],165:[function(require,module,exports){
/**
 * @fileoverview Rule to flag variable leak in CatchClauses in IE 8 and earlier
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function paramIsShadowing(scope, name) {
        var found = scope.variables.some(function(variable) {
            return variable.name === name;
        });

        if (found) {
            return true;
        }

        if (scope.upper) {
            return paramIsShadowing(scope.upper, name);
        }

        return false;
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {

        "CatchClause": function(node) {
            var scope = context.getScope();

            if (paramIsShadowing(scope, node.param.name)) {
                context.report(node, "Value of '{{name}}' may be overwritten in IE 8 and earlier.",
                        { name: node.param.name });
            }
        }
    };

};

},{}],166:[function(require,module,exports){
/**
 * @fileoverview Rule to flag trailing commas in object literals.
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

     //-------------------------------------------------------------------------
     // Helpers
     //-------------------------------------------------------------------------

    function checkForTrailingComma(node) {
        var items = node.properties || node.elements,
            length = items.length,
            lastItem, penultimateToken;

        if (length) {
            lastItem = items[length - 1];
            if (lastItem) {
                penultimateToken = context.getLastToken(node, 1);
                if (penultimateToken.value === ",") {
                    context.report(lastItem, penultimateToken.loc.start, "Trailing comma.");
                }
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "ObjectExpression": checkForTrailingComma,
        "ArrayExpression": checkForTrailingComma
    };

};

},{}],167:[function(require,module,exports){
/**
 * @fileoverview Rule to flag assignment in a conditional statement's test expression
 * @author Stephen Murray <spmurrayzzz>
 */
"use strict";

var NODE_DESCRIPTIONS = {
    "DoWhileStatement": "a 'do...while' statement",
    "ForStatement": "a 'for' statement",
    "IfStatement": "an 'if' statement",
    "WhileStatement": "a 'while' statement"
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var prohibitAssign = (context.options[0] || "except-parens");

    /**
     * Check whether an AST node is the test expression for a conditional statement.
     * @param {!Object} node The node to test.
     * @returns {boolean} `true` if the node is the text expression for a conditional statement; otherwise, `false`.
     */
    function isConditionalTestExpression(node) {
        return node.parent &&
            node.parent.test &&
            node === node.parent.test;
    }

    /**
     * Given an AST node, perform a bottom-up search for the first ancestor that represents a conditional statement.
     * @param {!Object} node The node to use at the start of the search.
     * @returns {?Object} The closest ancestor node that represents a conditional statement.
     */
    function findConditionalAncestor(node) {
        var currentAncestor = node;

        while ((currentAncestor = currentAncestor.parent)) {
            if (isConditionalTestExpression(currentAncestor)) {
                return currentAncestor.parent;
            }
        }

        return null;
    }

    /**
     * Check whether the code represented by an AST node is enclosed in parentheses.
     * @param {!Object} node The node to test.
     * @returns {boolean} `true` if the code is enclosed in parentheses; otherwise, `false`.
     */
    function isParenthesised(node) {
        var previousToken = context.getTokenBefore(node),
            nextToken = context.getTokenAfter(node);

        return previousToken.value === "(" && previousToken.range[1] <= node.range[0] &&
            nextToken.value === ")" && nextToken.range[0] >= node.range[1];
    }

    /**
     * Check whether the code represented by an AST node is enclosed in two sets of parentheses.
     * @param {!Object} node The node to test.
     * @returns {boolean} `true` if the code is enclosed in two sets of parentheses; otherwise, `false`.
     */
    function isParenthesisedTwice(node) {
        var previousToken = context.getTokenBefore(node, 1),
            nextToken = context.getTokenAfter(node, 1);

        return isParenthesised(node) &&
            previousToken.value === "(" && previousToken.range[1] <= node.range[0] &&
            nextToken.value === ")" && nextToken.range[0] >= node.range[1];
    }

    /**
     * Check a conditional statement's test expression for top-level assignments that are not enclosed in parentheses.
     * @param {!Object} node The node for the conditional statement.
     * @returns {void}
     */
    function testForAssign(node) {
        if (node.test && (node.test.type === "AssignmentExpression") && !isParenthesisedTwice(node.test)) {
            // must match JSHint's error message
            context.report(node, "Expected a conditional expression and instead saw an assignment.");
        }
    }

    /**
     * Check whether an assignment expression is descended from a conditional statement's test expression.
     * @param {!Object} node The node for the assignment expression.
     * @returns {void}
     */
    function testForConditionalAncestor(node) {
        var ancestor = findConditionalAncestor(node);

        if (ancestor) {
            context.report(ancestor, "Unexpected assignment within {{type}}.", {
                type: NODE_DESCRIPTIONS[ancestor.type] || ancestor.type
            });
        }
    }

    if (prohibitAssign === "always") {
        return {
            "AssignmentExpression": testForConditionalAncestor
        };
    }

    return {
        "DoWhileStatement": testForAssign,
        "ForStatement": testForAssign,
        "IfStatement": testForAssign,
        "WhileStatement": testForAssign
    };

};

},{}],168:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of console object
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "MemberExpression": function(node) {

            if (node.object.name === "console") {
                context.report(node, "Unexpected console statement.");
            }

        }
    };

};

},{}],169:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use constant conditions
 * @author Christian Schulz <http://rndm.de>
 * @copyright 2014 Christian Schulz. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Checks if a node has a constant truthiness value.
     * @param {ASTNode} node The AST node to check.
     * @returns {Bool} true when node's truthiness is constant
     * @private
     */
    function isConstant(node) {
        switch (node.type) {
            case "Literal":
            case "ArrowFunctionExpression":
            case "FunctionExpression":
            case "ObjectExpression":
            case "ArrayExpression":
                return true;
            case "UnaryExpression":
                return isConstant(node.argument);
            case "BinaryExpression":
            case "LogicalExpression":
                return isConstant(node.left) && isConstant(node.right);
            case "AssignmentExpression":
                return isConstant(node.right);
            case "SequenceExpression":
                return isConstant(node.expressions[node.expressions.length - 1]);
            // no default
        }
        return false;
    }

    /**
     * Reports when the given node contains a constant condition.
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     * @private
     */
    function checkConstantCondition(node) {
        if (node.test && isConstant(node.test)) {
            context.report(node, "Unexpected constant condition.");
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "ConditionalExpression": checkConstantCondition,
        "IfStatement": checkConstantCondition,
        "WhileStatement": checkConstantCondition,
        "DoWhileStatement": checkConstantCondition,
        "ForStatement": checkConstantCondition
    };

};

},{}],170:[function(require,module,exports){
/**
 * @fileoverview Rule to forbid control charactes from regular expressions.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function getRegExp(node) {

        if (node.value instanceof RegExp) {
            return node.value;
        } else if (typeof node.value === "string") {

            var parent = context.getAncestors().pop();
            if ((parent.type === "NewExpression" || parent.type === "CallExpression") &&
            parent.callee.type === "Identifier" && parent.callee.name === "RegExp") {

                // there could be an invalid regular expression string
                try {
                    return new RegExp(node.value);
                } catch (ex) {
                    return null;
                }

            }
        } else {
            return null;
        }

    }



    return {

        "Literal": function(node) {

            var computedValue,
                regex = getRegExp(node);

            if (regex) {
                computedValue = regex.toString();
                if (/[\x00-\x1f]/.test(computedValue)) {
                    context.report(node, "Unexpected control character in regular expression.");
                }
            }
        }
    };

};

},{}],171:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of a debugger statement
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "DebuggerStatement": function(node) {
            context.report(node, "Unexpected 'debugger' statement.");
        }
    };

};

},{}],172:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when deleting variables
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "UnaryExpression": function(node) {
            if (node.operator === "delete" && node.argument.type === "Identifier") {
                context.report(node, "Variables should not be deleted.");
            }
        }
    };

};

},{}],173:[function(require,module,exports){
/**
 * @fileoverview Rule to check for ambiguous div operator in regexes
 * @author Matt DuVall <http://www.mattduvall.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Literal": function(node) {
            var token = context.getFirstToken(node);

            if (token.type === "RegularExpression" && token.value[1] === "=") {
                context.report(node, "A regular expression literal can be confused with '/='.");
            }
        }
    };

};

},{}],174:[function(require,module,exports){
/**
 * @fileoverview Rule to flag duplicate arguments
 * @author Jamund Ferguson
 * @copyright 2015 Jamund Ferguson. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determines if a given node has duplicate parameters.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     * @private
     */
    function checkParams(node) {
        var dups = {};

        // loop through and find each duplicate param
        node.params.map(function(param) {
            return param.name;
        }).forEach(function(param, i, params) {
            var lastPos = params.lastIndexOf(param);
            if (i !== lastPos) {
                dups[param] = [i, lastPos];
            }
        });

        // log an error for each duplicate (not 2 for each)
        Object.keys(dups).forEach(function(currentParam) {
            context.report(node, "Duplicate param '{{key}}'.", { key: currentParam });
        });
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": checkParams,
        "FunctionExpression": checkParams
    };

};

},{}],175:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of duplicate keys in an object.
 * @author Ian Christian Myers
 * @copyright 2013 Ian Christian Myers. All rights reserved.
 * @copyright 2013 Nicholas C. Zakas. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "ObjectExpression": function(node) {

            // Object that will be a map of properties--safe because we will
            // prefix all of the keys.
            var nodeProps = Object.create(null);

            node.properties.forEach(function(property) {
                var keyName = property.key.name || property.key.value,
                    key = property.kind + "-" + keyName,
                    checkProperty = (!property.computed || property.key.type === "Literal");

                if (checkProperty) {
                    if (nodeProps[key]) {
                        context.report(node, "Duplicate key '{{key}}'.", { key: keyName });
                    } else {
                        nodeProps[key] = true;
                    }
                }
            });

        }
    };

};

},{}],176:[function(require,module,exports){
/**
 * @fileoverview Rule to flag `else` after a `return` in `if`
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Display the context report if rule is violated
     *
     * @param {Node} node The 'else' node
     * @returns {void}
     */
    function displayReport(node) {
        context.report(node, "Unexpected 'else' after 'return'.");
    }

    /**
     * Check to see if the node is a ReturnStatement
     *
     * @param {Node} node The node being evaluated
     * @returns {boolean} True if node is a return
     */
    function checkForReturn(node) {
        return node.type === "ReturnStatement";
    }

    /**
     * Naive return checking, does not iterate through the whole
     * BlockStatement because we make the assumption that the ReturnStatement
     * will be the last node in the body of the BlockStatement.
     *
     * @param {Node} node The consequent/alternate node
     * @returns {boolean} True if it has a return
     */
    function naiveHasReturn(node) {
        if (node.type === "BlockStatement") {
            var body = node.body,
                lastChildNode = body[body.length - 1];

            return lastChildNode && checkForReturn(lastChildNode);
        }
        return checkForReturn(node);
    }

    /**
     * Check to see if the node is valid for evaluation,
     * meaning it has an else and not an else-if
     *
     * @param {Node} node The node being evaluated
     * @returns {boolean} True if the node is valid
     */
    function hasElse(node) {
        return node.alternate && node.consequent && node.alternate.type !== "IfStatement";
    }

    /**
     * If the consequent is an IfStatement, check to see if it has an else
     * and both its consequent and alternate path return, meaning this is
     * a nested case of rule violation.  If-Else not considered currently.
     *
     * @param {Node} node The consequent node
     * @returns {boolean} True if this is a nested rule violation
     */
    function checkForIf(node) {
        return node.type === "IfStatement" && hasElse(node) &&
            naiveHasReturn(node.alternate) && naiveHasReturn(node.consequent);
    }

    /**
     * Check the consequent/body node to make sure it is not
     * a ReturnStatement or an IfStatement that returns on both
     * code paths.  If it is, display the context report.
     *
     * @param {Node} node The consequent or body node
     * @param {Node} alternate The alternate node
     * @returns {void}
     */
    function checkForReturnOrIf(node, alternate) {
        if (checkForReturn(node) || checkForIf(node)) {
            displayReport(alternate);
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {

        "IfStatement": function (node) {
            // Don't bother finding a ReturnStatement, if there's no `else`
            // or if the alternate is also an if (indicating an else if).
            if (hasElse(node)) {
                var consequent = node.consequent,
                    alternate = node.alternate;
                // If we have a BlockStatement, check each consequent body node.
                if (consequent.type === "BlockStatement") {
                    var body = consequent.body;
                    body.forEach(function (bodyNode) {
                        checkForReturnOrIf(bodyNode, alternate);
                    });
                // If not a block statement, make sure the consequent isn't a ReturnStatement
                // or an IfStatement with returns on both paths
                } else {
                    checkForReturnOrIf(consequent, alternate);
                }
            }
        }

    };

};

},{}],177:[function(require,module,exports){
/**
 * @fileoverview Rule to flag the use of empty character classes in regular expressions
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/*
plain-English description of the following regexp:
0. `^` fix the match at the beginning of the string
1. `\/`: the `/` that begins the regexp
2. `([^\\[]|\\.|\[([^\\\]]|\\.)+\])*`: regexp contents; 0 or more of the following
  2.0. `[^\\[]`: any character that's not a `\` or a `[` (anything but escape sequences and character classes)
  2.1. `\\.`: an escape sequence
  2.2. `\[([^\\\]]|\\.)+\]`: a character class that isn't empty
3. `\/` the `/` that ends the regexp
4. `[gimy]*`: optional regexp flags
5. `$`: fix the match at the end of the string
*/
var regex = /^\/([^\\[]|\\.|\[([^\\\]]|\\.)+\])*\/[gimy]*$/;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Literal": function(node) {
            var token = context.getFirstToken(node);
            if (token.type === "RegularExpression" && !regex.test(token.value)) {
                context.report(node, "Empty class.");
            }
        }

    };

};

},{}],178:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when label is not used for a loop or switch
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "LabeledStatement": function(node) {
            var type = node.body.type;

            if (type !== "ForStatement" && type !== "WhileStatement" && type !== "DoWhileStatement" && type !== "SwitchStatement" && type !== "ForInStatement" && type !== "ForOfStatement") {
                context.report(node, "Unexpected label {{l}}", {l: node.label.name});
            }
        }
    };

};

},{}],179:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of an empty block statement
 * @author Nicholas C. Zakas
 * @copyright Nicholas C. Zakas. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "BlockStatement": function(node) {
            var ancestors = context.getAncestors(),
                parent = ancestors[ancestors.length - 1],
                parentType = parent.type,
                hasHandler = !!(parent.handler || (parent.handlers && parent.handlers.length)),
                isFinallyBlock = (parentType === "TryStatement") && (parent.finalizer === node);

            if (/Function|CatchClause/.test(parentType) ||
                    (isFinallyBlock && !hasHandler)) {
                return;
            }

            if (node.body.length === 0) {
                context.report(node, "Empty block statement.");
            }
        },

        "SwitchStatement": function(node) {

            if (typeof node.cases === "undefined" || node.cases.length === 0) {
                context.report(node, "Empty switch statement.");
            }
        }
    };

};

},{}],180:[function(require,module,exports){
/**
 * @fileoverview Rule to flag comparisons to null without a type-checking
 * operator.
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "BinaryExpression": function(node) {
            var badOperator = node.operator === "==" || node.operator === "!=";

            if (node.right.type === "Literal" && node.right.raw === "null" && badOperator ||
                    node.left.type === "Literal" && node.left.raw === "null" && badOperator) {
                context.report(node, "Use ‘===’ to compare with ‘null’.");
            }
        }
    };

};

},{}],181:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of eval() statement
 * @author Nicholas C. Zakas
 * @copyright 2015 Mathias Schreck. All rights reserved.
 * @copyright 2013 Nicholas C. Zakas. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "CallExpression": function(node) {
            if (node.callee.name === "eval") {
                context.report(node, "eval can be harmful.");
            }
        }
    };

};

},{}],182:[function(require,module,exports){
/**
 * @fileoverview Rule to flag assignment of the exception parameter
 * @author Stephen Murray <spmurrayzzz>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var inCatch = false,
        exceptionName = null;

    return {

        "CatchClause": function(node) {
            inCatch = true;
            exceptionName = node.param.name;
        },

        "CatchClause:exit": function() {
            inCatch = false;
            exceptionName = null;
        },

        "AssignmentExpression": function(node) {

            if (inCatch) {

                if (node.left.name === exceptionName) {
                    context.report(node, "Do not assign to the exception parameter.");
                }
            }
        }

    };

};

},{}],183:[function(require,module,exports){
/**
 * @fileoverview Rule to flag adding properties to native object's prototypes.
 * @author David Nelson
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var BUILTINS = [
    "Object", "Function", "Array", "String", "Boolean", "Number", "Date",
    "RegExp", "Error", "EvalError", "RangeError", "ReferenceError",
    "SyntaxError", "TypeError", "URIError"
];

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        // handle the Array.prototype.extra style case
        "AssignmentExpression": function(node) {
            var lhs = node.left, affectsProto;

            if (lhs.type !== "MemberExpression" || lhs.object.type !== "MemberExpression") {
                return;
            }

            affectsProto = lhs.object.computed ?
                lhs.object.property.type === "Literal" && lhs.object.property.value === "prototype" :
                lhs.object.property.name === "prototype";

            if (!affectsProto) {
                return;
            }

            BUILTINS.forEach(function(builtin) {
                if (lhs.object.object.name === builtin) {
                    context.report(node, builtin + " prototype is read only, properties should not be added.");
                }
            });
        },

        // handle the Object.defineProperty(Array.prototype) case
        "CallExpression": function(node) {

            var callee = node.callee,
                subject,
                object;

            // only worry about Object.defineProperty
            if (callee.type === "MemberExpression" &&
                callee.object.name === "Object" &&
                callee.property.name === "defineProperty") {

                // verify the object being added to is a native prototype
                subject = node.arguments[0];
                object = subject.object;

                if (object &&
                    object.type === "Identifier" &&
                    (BUILTINS.indexOf(object.name) > -1) &&
                    subject.property.name === "prototype") {

                    context.report(node, object.name + " prototype is read only, properties should not be added.");
                }
            }

        }
    };

};

},{}],184:[function(require,module,exports){
/**
 * @fileoverview Rule to flag unnecessary bind calls
 * @author Bence Dányi <bence@danyi.me>
 * @copyright 2014 Bence Dányi. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var scope = [{
        depth: -1,
        found: 0
    }];

    /**
     * Get the topmost scope
     * @returns {Object} The topmost scope
     */
    function getTopScope() {
        return scope[scope.length - 1];
    }

    /**
     * Increment the depth of the top scope
     * @returns {void}
     */
    function incrementScopeDepth() {
        var top = getTopScope();
        top.depth++;
    }

    /**
     * Decrement the depth of the top scope
     * @returns {void}
     */
    function decrementScopeDepth() {
        var top = getTopScope();
        top.depth--;
    }

    return {
        "CallExpression": function(node) {
            if (node.arguments.length === 1 &&
                node.callee.type === "MemberExpression" &&
                node.callee.property.name === "bind" &&
                /FunctionExpression$/.test(node.callee.object.type)) {
                scope.push({
                    call: node,
                    depth: -1,
                    found: 0
                });
            }
        },
        "CallExpression:exit": function(node) {
            var top = getTopScope();
            if (top.call === node && top.found === 0) {
                context.report(node, "The function binding is unnecessary.");
                scope.pop();
            }
        },
        "ArrowFunctionExpression": incrementScopeDepth,
        "ArrowFunctionExpression:exit": decrementScopeDepth,
        "FunctionExpression": incrementScopeDepth,
        "FunctionExpression:exit": decrementScopeDepth,
        "FunctionDeclaration": incrementScopeDepth,
        "FunctionDeclaration:exit": decrementScopeDepth,
        "ThisExpression": function() {
            var top = getTopScope();
            if (top.depth === 0) {
                top.found++;
            }
        }
    };

};

},{}],185:[function(require,module,exports){
/**
 * @fileoverview Rule to flag unnecessary double negation in Boolean contexts
 * @author Brandon Mills
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "UnaryExpression": function (node) {
            var ancestors = context.getAncestors(),
                parent = ancestors.pop(),
                grandparent = ancestors.pop();

            // Exit early if it's guaranteed not to match
            if (node.operator !== "!" ||
                    parent.type !== "UnaryExpression" ||
                    parent.operator !== "!") {
                return;
            }

            // if (<bool>) ...
            if (grandparent.type === "IfStatement") {
                context.report(node, "Redundant double negation in an if statement condition.");

            // do ... while (<bool>)
            } else if (grandparent.type === "DoWhileStatement") {
                context.report(node, "Redundant double negation in a do while loop condition.");

            // while (<bool>) ...
            } else if (grandparent.type === "WhileStatement") {
                context.report(node, "Redundant double negation in a while loop condition.");

            // <bool> ? ... : ...
            } else if ((grandparent.type === "ConditionalExpression" &&
                    parent === grandparent.test)) {
                context.report(node, "Redundant double negation in a ternary condition.");

            // for (...; <bool>; ...) ...
            } else if ((grandparent.type === "ForStatement" &&
                    parent === grandparent.test)) {
                context.report(node, "Redundant double negation in a for loop condition.");

            // !<bool>
            } else if ((grandparent.type === "UnaryExpression" &&
                    grandparent.operator === "!")) {
                context.report(node, "Redundant multiple negation.");

            // Boolean(<bool>)
            } else if ((grandparent.type === "CallExpression" &&
                    grandparent.callee.type === "Identifier" &&
                    grandparent.callee.name === "Boolean")) {
                context.report(node, "Redundant double negation in call to Boolean().");

            // new Boolean(<bool>)
            } else if ((grandparent.type === "NewExpression" &&
                    grandparent.callee.type === "Identifier" &&
                    grandparent.callee.name === "Boolean")) {
                context.report(node, "Redundant double negation in Boolean constructor call.");
            }
        }
    };

};

},{}],186:[function(require,module,exports){
/**
 * @fileoverview Disallow parenthesesisng higher precedence subexpressions.
 * @author Michael Ficarra
 * @copyright 2014 Michael Ficarra. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function isParenthesised(node) {
        var previousToken = context.getTokenBefore(node),
            nextToken = context.getTokenAfter(node);

        return previousToken && nextToken &&
            previousToken.value === "(" && previousToken.range[1] <= node.range[0] &&
            nextToken.value === ")" && nextToken.range[0] >= node.range[1];
    }

    function isParenthesisedTwice(node) {
        var previousToken = context.getTokenBefore(node, 1),
            nextToken = context.getTokenAfter(node, 1);

        return isParenthesised(node) && previousToken && nextToken &&
            previousToken.value === "(" && previousToken.range[1] <= node.range[0] &&
            nextToken.value === ")" && nextToken.range[0] >= node.range[1];
    }

    function precedence(node) {

        switch (node.type) {
            case "SequenceExpression":
                return 0;

            case "AssignmentExpression":
            case "YieldExpression":
                return 1;

            case "ConditionalExpression":
                return 3;

            case "LogicalExpression":
                switch (node.operator) {
                    case "||":
                        return 4;
                    case "&&":
                        return 5;
                    // no default
                }

                /* falls through */
            case "BinaryExpression":
                switch (node.operator) {
                    case "|":
                        return 6;
                    case "^":
                        return 7;
                    case "&":
                        return 8;
                    case "==":
                    case "!=":
                    case "===":
                    case "!==":
                        return 9;
                    case "<":
                    case "<=":
                    case ">":
                    case ">=":
                    case "in":
                    case "instanceof":
                        return 10;
                    case "<<":
                    case ">>":
                    case ">>>":
                        return 11;
                    case "+":
                    case "-":
                        return 12;
                    case "*":
                    case "/":
                    case "%":
                        return 13;
                    // no default
                }
                /* falls through */
            case "UnaryExpression":
                return 14;
            case "UpdateExpression":
                return 15;
            case "CallExpression":
                // IIFE is allowed to have parens in any position (#655)
                if (node.callee.type === "FunctionExpression") {
                    return -1;
                }
                return 16;
            case "NewExpression":
                return 17;
            // no default
        }
        return 18;
    }

    function report(node) {
        var previousToken = context.getTokenBefore(node);
        context.report(node, previousToken.loc.start, "Gratuitous parentheses around expression.");
    }

    function dryUnaryUpdate(node) {
        if (isParenthesised(node.argument) && precedence(node.argument) >= precedence(node)) {
            report(node.argument);
        }
    }

    function dryCallNew(node) {
        if (isParenthesised(node.callee) && precedence(node.callee) >= precedence(node) &&
        !(node.type === "CallExpression" && node.callee.type === "FunctionExpression")) {
            report(node.callee);
        }
        if (node.arguments.length === 1) {
            if (isParenthesisedTwice(node.arguments[0]) && precedence(node.arguments[0]) >= precedence({type: "AssignmentExpression"})) {
                report(node.arguments[0]);
            }
        } else {
            [].forEach.call(node.arguments, function(arg) {
                if (isParenthesised(arg) && precedence(arg) >= precedence({type: "AssignmentExpression"})) {
                    report(arg);
                }
            });
        }
    }

    function dryBinaryLogical(node) {
        var prec = precedence(node);
        if (isParenthesised(node.left) && precedence(node.left) >= prec) {
            report(node.left);
        }
        if (isParenthesised(node.right) && precedence(node.right) > prec) {
            report(node.right);
        }
    }

    return {
        "ArrayExpression": function(node) {
            [].forEach.call(node.elements, function(e) {
                if (e && isParenthesised(e) && precedence(e) >= precedence({type: "AssignmentExpression"})) {
                    report(e);
                }
            });
        },
        "AssignmentExpression": function(node) {
            if (isParenthesised(node.right) && precedence(node.right) >= precedence(node)) {
                report(node.right);
            }
        },
        "BinaryExpression": dryBinaryLogical,
        "CallExpression": dryCallNew,
        "ConditionalExpression": function(node) {
            if (isParenthesised(node.test) && precedence(node.test) >= precedence({type: "LogicalExpression", operator: "||"})) {
                report(node.test);
            }
            if (isParenthesised(node.consequent) && precedence(node.consequent) >= precedence({type: "AssignmentExpression"})) {
                report(node.consequent);
            }
            if (isParenthesised(node.alternate) && precedence(node.alternate) >= precedence({type: "AssignmentExpression"})) {
                report(node.alternate);
            }
        },
        "DoWhileStatement": function(node) {
            if (isParenthesisedTwice(node.test)) {
                report(node.test);
            }
        },
        "ExpressionStatement": function(node) {
            var firstToken;
            if (isParenthesised(node.expression)) {
                firstToken = context.getFirstToken(node.expression);
                if (firstToken.value !== "function" && firstToken.value !== "{") {
                    report(node.expression);
                }
            }
        },
        "ForInStatement": function(node) {
            if (isParenthesised(node.right)) {
                report(node.right);
            }
        },
        "ForOfStatement": function(node) {
            if (isParenthesised(node.right)) {
                report(node.right);
            }
        },
        "ForStatement": function(node) {
            if (node.init && isParenthesised(node.init)) {
                report(node.init);
            }

            if (node.test && isParenthesised(node.test)) {
                report(node.test);
            }

            if (node.update && isParenthesised(node.update)) {
                report(node.update);
            }
        },
        "IfStatement": function(node) {
            if (isParenthesisedTwice(node.test)) {
                report(node.test);
            }
        },
        "LogicalExpression": dryBinaryLogical,
        "MemberExpression": function(node) {
            if (
                isParenthesised(node.object) &&
                precedence(node.object) >= precedence(node) &&
                (
                    node.computed ||
                    !(
                        (node.object.type === "Literal" &&
                        typeof node.object.value === "number" &&
                        /^[0-9]+$/.test(context.getFirstToken(node.object).value))
                        ||
                        // RegExp literal is allowed to have parens (#1589)
                        (node.object.type === "Literal" && node.object.regex)
                    )
                )
            ) {
                report(node.object);
            }
        },
        "NewExpression": dryCallNew,
        "ObjectExpression": function(node) {
            [].forEach.call(node.properties, function(e) {
                var v = e.value;
                if (v && isParenthesised(v) && precedence(v) >= precedence({type: "AssignmentExpression"})) {
                    report(v);
                }
            });
        },
        "ReturnStatement": function(node) {
            if (node.argument && isParenthesised(node.argument) &&
                    // RegExp literal is allowed to have parens (#1589)
                    !(node.argument.type === "Literal" && node.argument.regex)) {
                report(node.argument);
            }
        },
        "SequenceExpression": function(node) {
            [].forEach.call(node.expressions, function(e) {
                if (isParenthesised(e) && precedence(e) >= precedence(node)) {
                    report(e);
                }
            });
        },
        "SwitchCase": function(node) {
            if (node.test && isParenthesised(node.test)) {
                report(node.test);
            }
        },
        "SwitchStatement": function(node) {
            if (isParenthesisedTwice(node.discriminant)) {
                report(node.discriminant);
            }
        },
        "ThrowStatement": function(node) {
            if (isParenthesised(node.argument)) {
                report(node.argument);
            }
        },
        "UnaryExpression": dryUnaryUpdate,
        "UpdateExpression": dryUnaryUpdate,
        "VariableDeclarator": function(node) {
            if (node.init && isParenthesised(node.init) &&
                    precedence(node.init) >= precedence({type: "AssignmentExpression"}) &&
                    // RegExp literal is allowed to have parens (#1589)
                    !(node.init.type === "Literal" && node.init.regex)) {
                report(node.init);
            }
        },
        "WhileStatement": function(node) {
            if (isParenthesisedTwice(node.test)) {
                report(node.test);
            }
        },
        "WithStatement": function(node) {
            if (isParenthesisedTwice(node.object)) {
                report(node.object);
            }
        }
    };

};

},{}],187:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of unnecessary semicolons
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "EmptyStatement": function(node) {
            context.report(node, "Unnecessary semicolon.");
        }
    };

};

},{}],188:[function(require,module,exports){
/**
 * @fileoverview Rule to flag unnecessary strict directives.
 * @author Ian Christian Myers
 * @copyright 2014 Ian Christian Myers. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function directives(block) {
        var ds = [], body = block.body, e, i, l;

        if (body) {
            for (i = 0, l = body.length; i < l; ++i) {
                e = body[i];

                if (
                    e.type === "ExpressionStatement" &&
                    e.expression.type === "Literal" &&
                    typeof e.expression.value === "string"
                ) {
                    ds.push(e.expression);
                } else {
                    break;
                }
            }
        }

        return ds;
    }

    function isStrict(directive) {
        return directive.value === "use strict";
    }

    function checkForUnnecessaryUseStrict(node) {
        var useStrictDirectives = directives(node).filter(isStrict),
            scope,
            upper;

        switch (useStrictDirectives.length) {
            case 0:
                break;

            case 1:
                scope = context.getScope();
                upper = scope.upper;

                if (upper && upper.functionExpressionScope) {
                    upper = upper.upper;
                }

                if (upper && upper.isStrict) {
                    context.report(useStrictDirectives[0], "Unnecessary 'use strict'.");
                }
                break;

            default:
                context.report(useStrictDirectives[1], "Multiple 'use strict' directives.");
        }
    }

    return {

        "Program": checkForUnnecessaryUseStrict,

        "ArrowFunctionExpression": function(node) {
            checkForUnnecessaryUseStrict(node.body);
        },

        "FunctionExpression": function(node) {
            checkForUnnecessaryUseStrict(node.body);
        },

        "FunctionDeclaration": function(node) {
            checkForUnnecessaryUseStrict(node.body);
        }
    };

};

},{}],189:[function(require,module,exports){
/**
 * @fileoverview Rule to flag fall-through cases in switch statements.
 * @author Matt DuVall <http://mattduvall.com/>
 */
"use strict";


var FALLTHROUGH_COMMENT = /falls\sthrough/;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var switches = [];

    return {

        "SwitchCase": function(node) {

            var consequent = node.consequent,
                switchData = switches[switches.length - 1],
                i,
                comments,
                comment;

            /*
             * Some developers wrap case bodies in blocks, so if there is just one
             * node and it's a block statement, check inside.
             */
            if (consequent.length === 1 && consequent[0].type === "BlockStatement") {
                consequent = consequent[0];
            }

            // checking on previous case
            if (!switchData.lastCaseClosed) {

                // a fall through comment will be the last trailing comment of the last case
                comments = context.getComments(switchData.lastCase).trailing;
                comment = comments[comments.length - 1];

                // unless the user doesn't like semicolons, in which case it's first leading comment of this case
                if (!comment) {
                    comments = context.getComments(node).leading;
                    comment = comments[comments.length - 1];
                }

                // check for comment
                if (!comment || !FALLTHROUGH_COMMENT.test(comment.value)) {

                    context.report(switchData.lastCase,
                        "Expected a \"break\" statement before \"{{code}}\".",
                        { code: node.test ? "case" : "default" });
                }
            }

            // now dealing with the current case
            switchData.lastCaseClosed = false;
            switchData.lastCase = node;

            // try to verify using statements - go backwards as a fast path for the search
            if (consequent.length) {
                for (i = consequent.length - 1; i >= 0; i--) {
                    if (/(?:Break|Continue|Return|Throw)Statement/.test(consequent[i].type)) {
                        switchData.lastCaseClosed = true;
                        break;
                    }
                }
            } else {
                // the case statement has no statements, so it must logically fall through
                switchData.lastCaseClosed = true;
            }

            /*
             * Any warnings are triggered when the next SwitchCase occurs.
             * There is no need to warn on the last SwitchCase, since it can't
             * fall through to anything.
             */
        },

        "SwitchStatement": function(node) {
            switches.push({
                node: node,
                lastCaseClosed: true,
                lastCase: null
            });
        },

        "SwitchStatement:exit": function() {
            switches.pop();
        }
    };

};

},{}],190:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of a leading/trailing decimal point in a numeric literal
 * @author James Allardice
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "Literal": function(node) {

            if (typeof node.value === "number") {
                if (node.raw.indexOf(".") === 0) {
                    context.report(node, "A leading decimal point can be confused with a dot.");
                }
                if (node.raw.indexOf(".") === node.raw.length - 1) {
                    context.report(node, "A trailing decimal point can be confused with a dot.");
                }
            }
        }
    };

};

},{}],191:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of function declaration identifiers as variables.
 * @author Ian Christian Myers
 * @copyright 2013 Ian Christian Myers. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /*
     * Walk the scope chain looking for either a FunctionDeclaration or a
     * VariableDeclaration with the same name as left-hand side of the
     * AssignmentExpression. If we find the FunctionDeclaration first, then we
     * warn, because a FunctionDeclaration is trying to become a Variable or a
     * FunctionExpression. If we find a VariableDeclaration first, then we have
     * a legitimate shadow variable.
     */
    function checkIfIdentifierIsFunction(scope, name) {
        var variable,
            def,
            i,
            j;

        // Loop over all of the identifiers available in scope.
        for (i = 0; i < scope.variables.length; i++) {
            variable = scope.variables[i];

            // For each identifier, see if it was defined in _this_ scope.
            for (j = 0; j < variable.defs.length; j++) {
                def = variable.defs[j];

                // Identifier is a function and was declared in this scope
                if (def.name.name === name && def.type === "FunctionName") {
                    return true;
                }

                // Identifier is a variable and was declared in this scope. This
                // is a legitimate shadow variable.
                if (def.name.name === name) {
                    return false;
                }
            }
        }

        // Check the upper scope.
        if (scope.upper) {
            return checkIfIdentifierIsFunction(scope.upper, name);
        }

        // We've reached the global scope and haven't found anything.
        return false;
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {

        "AssignmentExpression": function(node) {
            var scope = context.getScope(),
                name = node.left.name;

            if (checkIfIdentifierIsFunction(scope, name)) {
                context.report(node, "'{{name}}' is a function.", { name: name });
            }

        }

    };

};

},{}],192:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of implied eval via setTimeout and setInterval
 * @author James Allardice
 * @copyright 2015 Mathias Schreck. All rights reserved.
 * @copyright 2013 James Allardice. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var IMPLIED_EVAL = /set(?:Timeout|Interval)/;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Checks if the first argument of a given CallExpression node is a string literal.
     * @param {ASTNode} node The CallExpression node the check.
     * @returns {boolean} True if the first argument is a string literal, false if not.
     */
    function hasStringLiteralArgument(node) {
        var firstArgument = node.arguments[0];

        return firstArgument && firstArgument.type === "Literal" && typeof firstArgument.value === "string";
    }

    /**
     * Checks if the given MemberExpression node is window.setTimeout or window.setInterval.
     * @param {ASTNode} node The MemberExpression node to check.
     * @returns {boolean} Whether or not the given node is window.set*.
     */
    function isSetMemberExpression(node) {
        var object = node.object,
            property = node.property,
            hasSetPropertyName = IMPLIED_EVAL.test(property.name) || IMPLIED_EVAL.test(property.value);

        return object.name === "window" && hasSetPropertyName;

    }

    /**
     * Determines if a node represents a call to setTimeout/setInterval with
     * a string argument.
     * @param {ASTNode} node The node to check.
     * @returns {boolean} True if the node matches, false if not.
     * @private
     */
    function isImpliedEval(node) {
        var isMemberExpression = (node.callee.type === "MemberExpression"),
            isIdentifier = (node.callee.type === "Identifier"),
            isSetMethod = (isIdentifier && IMPLIED_EVAL.test(node.callee.name)) ||
                (isMemberExpression && isSetMemberExpression(node.callee));

        return isSetMethod && hasStringLiteralArgument(node);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            if (isImpliedEval(node)) {
                context.report(node, "Implied eval. Consider passing a function instead of a string.");
            }
        }
    };

};

},{}],193:[function(require,module,exports){
/**
 * @fileoverview Enforces or disallows inline comments.
 * @author Greg Cochard
 * @copyright 2014 Greg Cochard. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Will check that comments are not on lines starting with or ending with code
     * @param {ASTNode} node The comment node to check
     * @private
     * @returns {void}
     */
    function testCodeAroundComment(node) {

        // Get the whole line and cut it off at the start of the comment
        var startLine = String(context.getSourceLines()[node.loc.start.line - 1]);
        var endLine = String(context.getSourceLines()[node.loc.end.line - 1]);

        var preamble = startLine.slice(0, node.loc.start.column).trim();

        // Also check after the comment
        var postamble = endLine.slice(node.loc.end.column).trim();

        // Should be empty if there was only whitespace around the comment
        if (preamble || postamble) {
            context.report(node, "Unexpected comment inline with code.");
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "LineComment": testCodeAroundComment,
        "BlockComment": testCodeAroundComment

    };
};

},{}],194:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce declarations in program or function body root.
 * @author Brandon Mills
 * @copyright 2014 Brandon Mills. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Find the nearest Program or Function ancestor node.
     * @returns {Object} Ancestor's type and distance from node.
     */
    function nearestBody() {
        var ancestors = context.getAncestors(),
            ancestor = ancestors.pop(),
            generation = 1;

        while (ancestor && ["Program", "FunctionDeclaration",
                "FunctionExpression", "ArrowFunctionExpression"
                ].indexOf(ancestor.type) < 0) {
            generation += 1;
            ancestor = ancestors.pop();
        }

        return {
            // Type of containing ancestor
            type: ancestor.type,
            // Separation between ancestor and node
            distance: generation
        };
    }

    /**
     * Ensure that a given node is at a program or function body's root.
     * @param {ASTNode} node Declaration node to check.
     * @returns {void}
     */
    function check(node) {
        var body = nearestBody(node),
            valid = ((body.type === "Program" && body.distance === 1) ||
                body.distance === 2);

        if (!valid) {
            context.report(node, "Move {{type}} declaration to {{body}} root.",
                {
                    type: (node.type === "FunctionDeclaration" ?
                        "function" : "variable"),
                    body: (body.type === "Program" ?
                        "program" : "function body")
                }
            );
        }
    }

    return {

        "FunctionDeclaration": check,
        "VariableDeclaration": function(node) {
            if (context.options[0] === "both" && node.kind === "var") {
                check(node);
            }
        }

    };

};

},{}],195:[function(require,module,exports){
/**
 * @fileoverview Validate strings passed to the RegExp constructor
 * @author Michael Ficarra
 * @copyright 2014 Michael Ficarra. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var espree = require("espree");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function isString(node) {
        return node && node.type === "Literal" && typeof node.value === "string";
    }

    function check(node) {
        if (node.callee.type === "Identifier" && node.callee.name === "RegExp" && isString(node.arguments[0])) {
            var flags = isString(node.arguments[1]) ? node.arguments[1].value : "";

            try {
                void new RegExp(node.arguments[0].value);
            } catch(e) {
                context.report(node, e.message);
            }

            if (flags) {

                try {
                    espree.parse("/./" + flags, { ecmaFeatures: context.ecmaFeatures });
                } catch (ex) {
                    context.report(node, "Invalid flags supplied to RegExp constructor '" + flags + "'");
                }
            }

        }
    }

    return {
        "CallExpression": check,
        "NewExpression": check
    };

};

},{"espree":"espree"}],196:[function(require,module,exports){
/**
 * @fileoverview Rule to disalow whitespace that is not a tab or space, whitespace inside strings and comments are allowed
 * @author Jonathan Kingston
 * @copyright 2014 Jonathan Kingston. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var irregularWhitespace = /[\u0085\u00A0\ufeff\f\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u202f\u205f\u3000]+/mg;

    // Module store of errors that we have found
    var errors = [];

    /**
     * Removes errors that occur inside a string node
     * @param {ASTNode} node to check for matching errors.
     * @returns {void}
     * @private
     */
    function removeStringError(node) {
        var locStart = node.loc.start;
        var locEnd = node.loc.end;

        errors = errors.filter(function (error) {
            var errorLoc = error[1];
            if (errorLoc.line >= locStart.line && errorLoc.line <= locEnd.line) {
                if (errorLoc.column >= locStart.column && errorLoc.column <= locEnd.column) {
                    return false;
                }
            }
            return true;
        });
    }

    /**
     * Checks nodes for errors that we are choosing to ignore and calls the relevent methods to remove the errors
     * @param {ASTNode} node to check for matching errors.
     * @returns {void}
     * @private
     */
    function removeInvalidNodeErrors(node) {
        if (typeof node.value === "string") {
            // If we have irregular characters remove them from the errors list
            if (node.value.match(irregularWhitespace)) {
                removeStringError(node);
            }
        }
    }

    return {
        "Program": function (node) {
            /**
             * As we can easily fire warnings for all white space issues with all the source its simpler to fire them here
             * This means we can check all the application code without having to worry about issues caused in the parser tokens
             * When writing this code also evaluating per node was missing out connecting tokens in some cases
             * We can later filter the errors when they are found to be not an issue in nodes we don't care about
             */
            var sourceLines = context.getSourceLines();

            sourceLines.forEach(function (sourceLine, lineIndex) {
                var location,
                    match = irregularWhitespace.exec(sourceLine);

                if (match !== null) {
                    location = {
                        line: lineIndex + 1,
                        column: match.index
                    };

                    errors.push([node, location, "Irregular whitespace not allowed"]);
                }
            });
        },
        "Identifier": removeInvalidNodeErrors,
        "Literal": removeInvalidNodeErrors,
        "Statement": removeInvalidNodeErrors,
        "Expression": removeInvalidNodeErrors,
        "Program:exit": function () {

            // If we have any errors remaining report on them
            errors.forEach(function (error) {
                context.report.apply(this, error);
            });
        }
    };
};

},{}],197:[function(require,module,exports){
/**
 * @fileoverview Rule to flag usage of __iterator__ property
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "MemberExpression": function(node) {

            if (node.property &&
                    (node.property.type === "Identifier" && node.property.name === "__iterator__" && !node.computed) ||
                    (node.property.type === "Literal" && node.property.value === "__iterator__")) {
                context.report(node, "Reserved name '__iterator__'.");
            }
        }
    };

};

},{}],198:[function(require,module,exports){
/**
 * @fileoverview Rule to flag labels that are the same as an identifier
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function findIdentifier(scope, identifier) {
        var found = false;

        scope.variables.forEach(function(variable) {
            if (variable.name === identifier) {
                found = true;
            }
        });

        scope.references.forEach(function(reference) {
            if (reference.identifier.name === identifier) {
                found = true;
            }
        });

        // If we have not found the identifier in this scope, check the parent
        // scope.
        if (scope.upper && !found) {
            return findIdentifier(scope.upper, identifier);
        }

        return found;
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {

        "LabeledStatement": function(node) {

            // Fetch the innermost scope.
            var scope = context.getScope();

            // Recursively find the identifier walking up the scope, starting
            // with the innermost scope.
            if (findIdentifier(scope, node.label.name)) {
                context.report(node, "Found identifier with same name as label.");
            }
        }

    };

};

},{}],199:[function(require,module,exports){
/**
 * @fileoverview Disallow Labeled Statements
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "LabeledStatement": function(node) {
            context.report(node, "Unexpected labeled statement.");
        },

        "BreakStatement": function(node) {

            if (node.label) {
                context.report(node, "Unexpected label in break statement.");
            }

        },

        "ContinueStatement": function(node) {

            if (node.label) {
                context.report(node, "Unexpected label in continue statement.");
            }

        }


    };

};

},{}],200:[function(require,module,exports){
/**
 * @fileoverview Rule to flag blocks with no reason to exist
 * @author Brandon Mills
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "BlockStatement": function (node) {
            // Check for any occurrence of BlockStatement > BlockStatement or
            // Program > BlockStatement
            var parent = context.getAncestors().pop();
            if (parent.type === "BlockStatement" || parent.type === "Program") {
                context.report(node, "Block is nested inside another block.");
            }
        }
    };

};

},{}],201:[function(require,module,exports){
/**
 * @fileoverview Rule to disallow if as the only statmenet in an else block
 * @author Brandon Mills
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "IfStatement": function(node) {
            var ancestors = context.getAncestors(),
                parent = ancestors.pop(),
                grandparent = ancestors.pop();

            if (parent && parent.type === "BlockStatement" &&
                    parent.body.length === 1 && grandparent &&
                    grandparent.type === "IfStatement" &&
                    parent === grandparent.alternate) {
                context.report(node, "Unexpected if as the only statement in an else block.");
            }
        }
    };

};

},{}],202:[function(require,module,exports){
/**
 * @fileoverview Rule to flag creation of function inside a loop
 * @author Ilya Volodin
 * @copyright 2013 Ilya Volodin. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var loopNodeTypes = [
        "ForStatement",
        "WhileStatement",
        "ForInStatement",
        "ForOfStatement",
        "DoWhileStatement"
    ];

    /**
     * Checks if the given node is a loop.
     * @param {ASTNode} node The AST node to check.
     * @returns {boolean} Whether or not the node is a loop.
     */
    function isLoop(node) {
        return loopNodeTypes.indexOf(node.type) > -1;
    }

    /**
     * Reports if the given node has an ancestor node which is a loop.
     * @param {ASTNode} node The AST node to check.
     * @returns {boolean} Whether or not the node is within a loop.
     */
    function checkForLoops(node) {
        var ancestors = context.getAncestors();

        if (ancestors.some(isLoop)) {
            context.report(node, "Don't make functions within a loop");
        }
    }

    return {
        "ArrowFunctionExpression": checkForLoops,
        "FunctionExpression": checkForLoops,
        "FunctionDeclaration": checkForLoops
    };
};

},{}],203:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce grouped require statements for Node.JS
 * @author Raphael Pigulla
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Returns the list of built-in modules.
     *
     * @returns {string[]} An array of built-in Node.js modules.
     */
    function getBuiltinModules() {
        // This list is generated using `require("repl")._builtinLibs.concat('repl').sort()`
        // This particular list was generated using node v0.11.9
        return [
            "assert", "buffer", "child_process", "cluster", "crypto",
            "dgram", "dns", "domain", "events", "fs", "http", "https",
            "net", "os", "path", "punycode", "querystring", "readline",
            "repl", "smalloc", "stream", "string_decoder", "tls", "tty",
            "url", "util", "vm", "zlib"
        ];
    }

    var BUILTIN_MODULES = getBuiltinModules();

    var DECL_REQUIRE = "require",
        DECL_UNINITIALIZED = "uninitialized",
        DECL_OTHER = "other";

    var REQ_CORE = "core",
        REQ_FILE = "file",
        REQ_MODULE = "module",
        REQ_COMPUTED = "computed";

    /**
     * Determines the type of a declaration statement.
     * @param {ASTNode} initExpression The init node of the VariableDeclarator.
     * @returns {string} The type of declaration represented by the expression.
     */
    function getDeclarationType(initExpression) {
        if (!initExpression) {
            // "var x;"
            return DECL_UNINITIALIZED;
        }

        if (initExpression.type === "CallExpression" &&
            initExpression.callee.type === "Identifier" &&
            initExpression.callee.name === "require"
        ) {
            // "var x = require('util');"
            return DECL_REQUIRE;
        } else if (initExpression.type === "MemberExpression") {
            // "var x = require('glob').Glob;"
            return getDeclarationType(initExpression.object);
        }

        // "var x = 42;"
        return DECL_OTHER;
    }

    /**
     * Determines the type of module that is loaded via require.
     * @param {ASTNode} initExpression The init node of the VariableDeclarator.
     * @returns {string} The module type.
     */
    function inferModuleType(initExpression) {
        if (initExpression.type === "MemberExpression") {
            // "var x = require('glob').Glob;"
            return inferModuleType(initExpression.object);
        } else if (initExpression.arguments.length === 0) {
            // "var x = require();"
            return REQ_COMPUTED;
        }

        var arg = initExpression.arguments[0];

        if (arg.type !== "Literal" || typeof arg.value !== "string") {
            // "var x = require(42);"
            return REQ_COMPUTED;
        }

        if (BUILTIN_MODULES.indexOf(arg.value) !== -1) {
            // "var fs = require('fs');"
            return REQ_CORE;
        } else if (/^\.{0,2}\//.test(arg.value)) {
            // "var utils = require('./utils');"
            return REQ_FILE;
        } else {
            // "var async = require('async');"
            return REQ_MODULE;
        }
    }

    /**
     * Check if the list of variable declarations is mixed, i.e. whether it
     * contains both require and other declarations.
     * @param {ASTNode} declarations The list of VariableDeclarators.
     * @returns {boolean} True if the declarations are mixed, false if not.
     */
    function isMixed(declarations) {
        var contains = {};

        declarations.forEach(function (declaration) {
            var type = getDeclarationType(declaration.init);
            contains[type] = true;
        });

        return !!(
            contains[DECL_REQUIRE] &&
            (contains[DECL_UNINITIALIZED] || contains[DECL_OTHER])
        );
    }

    /**
     * Check if all require declarations in the given list are of the same
     * type.
     * @param {ASTNode} declarations The list of VariableDeclarators.
     * @returns {boolean} True if the declarations are grouped, false if not.
     */
    function isGrouped(declarations) {
        var found = {};

        declarations.forEach(function (declaration) {
            if (getDeclarationType(declaration.init) === DECL_REQUIRE) {
                found[inferModuleType(declaration.init)] = true;
            }
        });

        return Object.keys(found).length <= 1;
    }


    return {

        "VariableDeclaration": function(node) {
            var grouping = !!context.options[0];

            if (isMixed(node.declarations)) {
                context.report(
                    node,
                    "Do not mix 'require' and other declarations."
                );
            } else if (grouping && !isGrouped(node.declarations)) {
                context.report(
                    node,
                    "Do not mix core, module, file and computed requires."
                );
            }
        }
    };

};

},{}],204:[function(require,module,exports){
/**
 * @fileoverview Disallow mixed spaces and tabs for indentation
 * @author Jary Niebur
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2014 Jary Niebur. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var smartTabs;

    switch (context.options[0]) {
        case true: // Support old syntax, maybe add deprecation warning here
        case "smart-tabs":
            smartTabs = true;
            break;
        default:
            smartTabs = false;
    }

    var COMMENT_START = /^\s*\/\*/,
        MAYBE_COMMENT = /^\s*\*/;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program": function(node) {
            /*
             * At least one space followed by a tab
             * or the reverse before non-tab/-space
             * characters begin.
             */
            var regex = /^(?=[\t ]*(\t | \t))/,
                match,
                lines = context.getSourceLines();

            if (smartTabs) {
                /*
                 * At least one space followed by a tab
                 * before non-tab/-space characters begin.
                 */
                regex = /^(?=[\t ]* \t)/;
            }

            lines.forEach(function(line, i) {
                match = regex.exec(line);

                if (match) {

                    if (!MAYBE_COMMENT.test(line) && !COMMENT_START.test(lines[i - 1])) {
                        context.report(node, { line: i + 1, column: match.index + 1 }, "Mixed spaces and tabs.");
                    }

                }
            });
        }

    };

};

},{}],205:[function(require,module,exports){
/**
 * @fileoverview Disallow use of multiple spaces.
 * @author Nicholas C. Zakas
 * @copyright 2015 Brandon Mills. All rights reserved.
 * @copyright 2015 Nicholas C. Zakas. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // the index of the last comment that was checked
    var exceptions = { "Property": true },
        hasExceptions = true,
        options = context.options[0],
        lastCommentIndex = 0;

    if (options && options.exceptions) {
        Object.keys(options.exceptions).forEach(function (key) {
            if (options.exceptions[key]) {
                exceptions[key] = true;
            } else {
                delete exceptions[key];
            }
        });
        hasExceptions = Object.keys(exceptions).length > 0;
    }

    /**
     * Determines if a given source index is in a comment or not by checking
     * the index against the comment range. Since the check goes straight
     * through the file, once an index is passed a certain comment, we can
     * go to the next comment to check that.
     * @param {int} index The source index to check.
     * @param {ASTNode[]} comments An array of comment nodes.
     * @returns {boolean} True if the index is within a comment, false if not.
     * @private
     */
    function isIndexInComment(index, comments) {

        var comment;

        while (lastCommentIndex < comments.length) {

            comment = comments[lastCommentIndex];

            if (comment.range[0] <= index && index < comment.range[1]) {
                return true;
            } else if (index > comment.range[1]) {
                lastCommentIndex++;
            } else {
                break;
            }

        }

        return false;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Program": function() {

            var source = context.getSource(),
                allComments = context.getAllComments(),
                pattern = /[^\n\r\u2028\u2029 ] {2,}/g,  // note: repeating space
                token,
                parent;

            while (pattern.test(source)) {

                // do not flag anything inside of comments
                if (!isIndexInComment(pattern.lastIndex, allComments)) {

                    token = context.getTokenByRangeStart(pattern.lastIndex);

                    if (token) {
                        if (hasExceptions) {
                            parent = context.getNodeByRangeIndex(pattern.lastIndex - 1);
                        }

                        if (!parent || !exceptions[parent.type]) {
                            context.report(token, token.loc.start,
                                "Multiple spaces found before '{{value}}'.",
                                { value: token.value });
                        }
                    }

                }
            }
        }
    };

};

},{}],206:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when using multiline strings
 * @author Ilya Volodin
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2013 Ilya Volodin. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Determines if a given node is part of JSX syntax.
     * @param {ASTNode} node The node to check.
     * @returns {boolean} True if the node is a JSX node, false if not.
     * @private
     */
    function isJSXElement(node) {
        return node.type.indexOf("JSX") === 0;
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {

        "Literal": function(node) {
            var lineBreak = /\n/;

            if (lineBreak.test(node.raw) && !isJSXElement(node.parent)) {
                context.report(node, "Multiline support is limited to browsers supporting ES5 only.");
            }
        }
    };

};

},{}],207:[function(require,module,exports){
/**
 * @fileoverview Disallows multiple blank lines.
 * implementation adapted from the no-trailing-spaces rule.
 * @author Greg Cochard
 * @copyright 2014 Greg Cochard. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // Use options.max or 2 as default
    var numLines = 2;

    if (context.options.length) {
        numLines = context.options[0].max;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program": function checkBlankLines(node) {
            var lines = context.getSourceLines(),
                currentLocation = -1,
                lastLocation,
                blankCounter = 0,
                location,
                trimmedLines = lines.map(function(str) {
                    return str.trim();
                });

            // Aggregate and count blank lines
            do {
                lastLocation = currentLocation;
                currentLocation = trimmedLines.indexOf("", currentLocation + 1);
                if (lastLocation === currentLocation - 1) {
                    blankCounter++;
                } else {
                    if (blankCounter >= numLines) {
                        location = {
                            line: lastLocation + 1,
                            column: lines[lastLocation].length
                        };
                        context.report(node, location, "Multiple blank lines not allowed.");
                    }

                    // Finally, reset the blank counter
                    blankCounter = 0;
                }
            } while (currentLocation !== -1);
        }
    };

};

},{}],208:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when re-assigning native objects
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var nativeObjects = ["Array", "Boolean", "Date", "decodeURI",
                        "decodeURIComponent", "encodeURI", "encodeURIComponent",
                        "Error", "eval", "EvalError", "Function", "isFinite",
                        "isNaN", "JSON", "Math", "Number", "Object", "parseInt",
                        "parseFloat", "RangeError", "ReferenceError", "RegExp",
                        "String", "SyntaxError", "TypeError", "URIError",
                        "Map", "NaN", "Set", "WeakMap", "Infinity", "undefined"];

    return {

        "AssignmentExpression": function(node) {
            if (nativeObjects.indexOf(node.left.name) >= 0) {
                context.report(node, node.left.name + " is a read-only native object.");
            }
        },

        "VariableDeclarator": function(node) {
            if (nativeObjects.indexOf(node.id.name) >= 0) {
                context.report(node, "Redefinition of '{{nativeObject}}'.", { nativeObject: node.id.name });
            }
        }
    };

};

},{}],209:[function(require,module,exports){
/**
 * @fileoverview A rule to disallow negated left operands of the `in` operator
 * @author Michael Ficarra
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "BinaryExpression": function(node) {
            if (node.operator === "in" && node.left.type === "UnaryExpression" && node.left.operator === "!") {
                context.report(node, "The `in` expression's left operand is negated");
            }
        }
    };

};

},{}],210:[function(require,module,exports){
/**
 * @fileoverview Rule to flag nested ternary expressions
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "ConditionalExpression": function(node) {
            if (node.alternate.type === "ConditionalExpression" ||
                    node.consequent.type === "ConditionalExpression") {
                context.report(node, "Do not nest ternary expressions");
            }
        }
    };
};

},{}],211:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when using new Function
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "NewExpression": function(node) {
            if (node.callee.name === "Function") {
                context.report(node, "The Function constructor is eval.");
            }
        }
    };

};

},{}],212:[function(require,module,exports){
/**
 * @fileoverview A rule to disallow calls to the Object constructor
 * @author Matt DuVall <http://www.mattduvall.com/>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "NewExpression": function(node) {
            if (node.callee.name === "Object") {
                context.report(node, "The object literal notation {} is preferrable.");
            }
        }
    };

};

},{}],213:[function(require,module,exports){
/**
 * @fileoverview Rule to disallow use of new operator with the `require` function
 * @author Wil Moore III
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "NewExpression": function(node) {
            if (node.callee.type === "Identifier" && node.callee.name === "require") {
                context.report(node, "Unexpected use of new with require.");
            }
        }
    };

};

},{}],214:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when using constructor for wrapper objects
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "NewExpression": function(node) {
            var wrapperObjects = ["String", "Number", "Boolean", "Math", "JSON"];
            if (wrapperObjects.indexOf(node.callee.name) > -1) {
                context.report(node, "Do not use {{fn}} as a constructor.", { fn: node.callee.name });
            }
        }
    };

};

},{}],215:[function(require,module,exports){
/**
 * @fileoverview Rule to flag statements with function invocation preceded by
 * "new" and not part of assignment
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "ExpressionStatement": function(node) {

            if (node.expression.type === "NewExpression") {
                context.report(node, "Do not use 'new' for side effects.");
            }
        }
    };

};

},{}],216:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of an object property of the global object (Math and JSON) as a function
 * @author James Allardice
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "CallExpression": function(node) {

            if (node.callee.type === "Identifier") {
                var name = node.callee.name;
                if (name === "Math" || name === "JSON") {
                    context.report(node, "'{{name}}' is not a function.", { name: name });
                }
            }
        }
    };

};

},{}],217:[function(require,module,exports){
/**
 * @fileoverview Rule to flag octal escape sequences in string literals.
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Literal": function(node) {
            if (typeof node.value !== "string") {
                return;
            }
            var match = node.raw.match(/^([^\\]|\\[^0-7])*\\([0-7])/),
                octalDigit;

            if (match) {
                octalDigit = match[2];
                context.report(node, "Don't use octal: '\\{{octalDigit}}'. Use '\\u....' instead.",
                        { octalDigit: octalDigit });
            }
        }

    };

};

},{}],218:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when initializing octal literal
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Literal": function(node) {
            if (typeof node.value === "number" && /^0[0-7]/.test(node.raw)) {
                context.report(node, "Octal literals should not be used.");
            }
        }
    };

};

},{}],219:[function(require,module,exports){
/**
 * @fileoverview Disallow string concatenation when using __dirname and __filename
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var MATCHER = /^__(?:dir|file)name$/;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "BinaryExpression": function(node) {

            var left = node.left,
                right = node.right;

            if (node.operator === "+" &&
                    ((left.type === "Identifier" && MATCHER.test(left.name)) ||
                    (right.type === "Identifier" && MATCHER.test(right.name)))
            ) {

                context.report(node, "Use path.join() or path.resolve() instead of + to create paths.");
            }
        }

    };

};

},{}],220:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of unary increment and decrement operators.
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "UpdateExpression": function(node) {
            context.report(node, "Unary operator '" + node.operator + "' used.");
        }

    };

};

},{}],221:[function(require,module,exports){
/**
 * @fileoverview Disallow the use of process.env()
 * @author Vignesh Anand
 * @copyright 2014 Vignesh Anand. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "MemberExpression": function(node) {
            var objectName = node.object.name,
                propertyName = node.property.name;

            if (objectName === "process" && !node.computed && propertyName && propertyName === "env") {
                context.report(node, "Unexpected use of process.env.");
            }

        }

    };

};

},{}],222:[function(require,module,exports){
/**
 * @fileoverview Disallow the use of process.exit()
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "CallExpression": function(node) {
            var callee = node.callee;

            if (callee.type === "MemberExpression" && callee.object.name === "process" &&
                callee.property.name === "exit"
            ) {
                context.report(node, "Don't use process.exit(); throw an error instead.");
            }
        }

    };

};

},{}],223:[function(require,module,exports){
/**
 * @fileoverview Rule to flag usage of __proto__ property
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "MemberExpression": function(node) {

            if (node.property &&
                    (node.property.type === "Identifier" && node.property.name === "__proto__" && !node.computed) ||
                    (node.property.type === "Literal" && node.property.value === "__proto__")) {
                context.report(node, "The '__proto__' property is deprecated.");
            }
        }
    };

};

},{}],224:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when the same variable is declared more then once.
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function findVariables() {
        var scope = context.getScope();

        scope.variables.forEach(function(variable) {
            if (variable.identifiers && variable.identifiers.length > 1) {
                variable.identifiers.sort(function(a, b) {
                    return a.range[1] - b.range[1];
                });

                for (var i = 1, l = variable.identifiers.length; i < l; i++) {
                    context.report(variable.identifiers[i], "{{a}} is already defined", {a: variable.name});
                }
            }
        });
    }

    return {
        "Program": findVariables,
        "FunctionExpression": findVariables,
        "FunctionDeclaration": findVariables
    };
};

},{}],225:[function(require,module,exports){
/**
 * @fileoverview Rule to count multiple spaces in regular expressions
 * @author Matt DuVall <http://www.mattduvall.com/>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Literal": function(node) {
            var token = context.getFirstToken(node),
                nodeType = token.type,
                nodeValue = token.value,
                multipleSpacesRegex = /( {2,})+?/,
                regexResults;

            if (nodeType === "RegularExpression") {
                regexResults = multipleSpacesRegex.exec(nodeValue);

                if (regexResults !== null) {
                    context.report(node, "Spaces are hard to count. Use {" + regexResults[0].length + "}.");
                }
            }
        }
    };

};

},{}],226:[function(require,module,exports){
/**
 * @fileoverview Rule to disallow reserved words being used as keys
 * @author Emil Bay
 * @copyright 2014 Emil Bay. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var MESSAGE = "Reserved word '{{key}}' used as key.";

    var reservedWords = [
        "abstract",
        "boolean", "break", "byte",
        "case", "catch", "char", "class", "const", "continue",
        "debugger", "default", "delete", "do", "double",
        "else", "enum", "export", "extends",
        "final", "finally", "float", "for", "function",
        "goto",
        "if", "implements", "import", "in", "instanceof", "int", "interface",
        "long",
        "native", "new",
        "package", "private", "protected", "public",
        "return",
        "short", "static", "super", "switch", "synchronized",
        "this", "throw", "throws", "transient", "try", "typeof",
        "var", "void", "volatile",
        "while", "with"
    ];

    return {

        "ObjectExpression": function(node) {
            node.properties.forEach(function(property) {

                if (property.key.type === "Identifier") {
                    var keyName = property.key.name;

                    if (reservedWords.indexOf("" + keyName) !== -1) {
                        context.report(node, MESSAGE, { key: keyName });
                    }
                }

            });

        }
    };

};

},{}],227:[function(require,module,exports){
/**
 * @fileoverview Restrict usage of specified node modules.
 * @author Christian Schulz
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    // trim restricted module names
    var restrictedModules = context.options;

    // if no modules are restricted we don't need to check the CallExpressions
    if (restrictedModules.length === 0) {
        return {};
    }

    /**
     * Function to check if a node is a string literal.
     * @param {ASTNode} node The node to check.
     * @returns {boolean} If the node is a string literal.
     */
    function isString(node) {
        return node && node.type === "Literal" && typeof node.value === "string";
    }

    /**
     * Function to check if a node is a require call.
     * @param {ASTNode} node The node to check.
     * @returns {boolean} If the node is a require call.
     */
    function isRequireCall(node) {
        return node.callee.type === "Identifier" && node.callee.name === "require";
    }

    /**
     * Function to check if a node has an argument that is an restricted module and return its name.
     * @param {ASTNode} node The node to check
     * @returns {undefined|String} restricted module name or undefined if node argument isn't restricted.
     */
    function getRestrictedModuleName(node) {
        var moduleName;

        // node has arguments and first argument is string
        if (node.arguments.length && isString(node.arguments[0])) {
            var argumentValue = node.arguments[0].value.trim();

            // check if argument value is in restricted modules array
            if (restrictedModules.indexOf(argumentValue) !== -1) {
                moduleName = argumentValue;
            }
        }

        return moduleName;
    }

    return {
        "CallExpression": function (node) {
            if (isRequireCall(node)) {
                var restrictedModuleName = getRestrictedModuleName(node);

                if (restrictedModuleName) {
                    context.report(node, "'{{moduleName}}' module is restricted from being used.", {
                        moduleName: restrictedModuleName
                    });
                }
            }
        }
    };
};

},{}],228:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when return statement contains assignment
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "ReturnStatement": function(node) {
            if (node.argument && node.argument.type === "AssignmentExpression") {
                context.report(node, "Return statement should not contain assignment.");
            }
        }
    };

};

},{}],229:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when using javascript: urls
 * @author Ilya Volodin
 */
/*jshint scripturl: true */
/*eslint no-script-url: 0*/

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Literal": function(node) {

            var value;

            if (node.value && typeof node.value === "string") {
                value = node.value.toLowerCase();

                if (value.indexOf("javascript:") === 0) {
                    context.report(node, "Script URL is a form of eval.");
                }
            }
        }
    };

};

},{}],230:[function(require,module,exports){
/**
 * @fileoverview Rule to flag comparison where left part is the same as the right
 * part.
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "BinaryExpression": function(node) {
            var operators = ["===", "==", "!==", "!=", ">", "<", ">=", "<="];
            if (operators.indexOf(node.operator) > -1 &&
                (node.left.type === "Identifier" && node.right.type === "Identifier" && node.left.name === node.right.name ||
                node.left.type === "Literal" && node.right.type === "Literal" && node.left.value === node.right.value)) {
                context.report(node, "Comparing to itself is potentially pointless.");
            }
        }
    };

};

},{}],231:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of comma operator
 * @author Brandon Mills
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Parts of the grammar that are required to have parens.
     */
    var parenthesized = {
        "DoWhileStatement": "test",
        "IfStatement": "test",
        "SwitchStatement": "discriminant",
        "WhileStatement": "test",
        "WithStatement": "object"

        // Omitting CallExpression - commas are parsed as argument separators
        // Omitting NewExpression - commas are parsed as argument separators
        // Omitting ForInStatement - parts aren't individually parenthesised
        // Omitting ForStatement - parts aren't individually parenthesised
    };

    /**
     * Determines whether a node is required by the grammar to be wrapped in
     * parens, e.g. the test of an if statement.
     * @param {ASTNode} node - The AST node
     * @returns {boolean} True if parens around node belong to parent node.
     */
    function requiresExtraParens(node) {
        return node.parent && parenthesized[node.parent.type] != null &&
                node === node.parent[parenthesized[node.parent.type]];
    }

    /**
     * Check if a node is wrapped in parens.
     * @param {ASTNode} node - The AST node
     * @returns {boolean} True if the node has a paren on each side.
     */
    function isParenthesised(node) {
        var previousToken = context.getTokenBefore(node),
            nextToken = context.getTokenAfter(node);

        return previousToken && nextToken &&
            previousToken.value === "(" && previousToken.range[1] <= node.range[0] &&
            nextToken.value === ")" && nextToken.range[0] >= node.range[1];
    }

    /**
     * Check if a node is wrapped in two levels of parens.
     * @param {ASTNode} node - The AST node
     * @returns {boolean} True if two parens surround the node on each side.
     */
    function isParenthesisedTwice(node) {
        var previousToken = context.getTokenBefore(node, 1),
            nextToken = context.getTokenAfter(node, 1);

        return isParenthesised(node) && previousToken && nextToken &&
            previousToken.value === "(" && previousToken.range[1] <= node.range[0] &&
            nextToken.value === ")" && nextToken.range[0] >= node.range[1];
    }

    return {
        "SequenceExpression": function(node) {
            // Always allow sequences in for statement update
            if (node.parent.type === "ForStatement" &&
                    (node === node.parent.init || node === node.parent.update)) {
                return;
            }

            // Wrapping a sequence in extra parens indicates intent
            if (requiresExtraParens(node)) {
                if (isParenthesisedTwice(node)) {
                    return;
                }
            } else {
                if (isParenthesised(node)) {
                    return;
                }
            }

            context.report(node, "Unexpected use of comma operator.");
        }
    };

};

},{}],232:[function(require,module,exports){
/**
 * @fileoverview Disallow shadowing of NaN, undefined, and Infinity (ES5 section 15.1.1)
 * @author Michael Ficarra
 * @copyright 2013 Michael Ficarra. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var RESTRICTED = ["undefined", "NaN", "Infinity", "arguments", "eval"];

    function checkForViolation(id) {
        if (RESTRICTED.indexOf(id.name) > -1) {
            context.report(id, "Shadowing of global property \"" + id.name + "\".");
        }
    }

    return {
        "VariableDeclarator": function(node) {
            checkForViolation(node.id);
        },
        "ArrowFunctionExpression": function(node) {
            if (node.id) {
                checkForViolation(node.id);
            }
            [].map.call(node.params, checkForViolation);
        },
        "FunctionExpression": function(node) {
            if (node.id) {
                checkForViolation(node.id);
            }
            [].map.call(node.params, checkForViolation);
        },
        "FunctionDeclaration": function(node) {
            checkForViolation(node.id);
            [].map.call(node.params, checkForViolation);
        },
        "CatchClause": function(node) {
            checkForViolation(node.param);
        }
    };

};

},{}],233:[function(require,module,exports){
/**
 * @fileoverview Rule to flag on declaring variables already declared in the outer scope
 * @author Ilya Volodin
 * @copyright 2013 Ilya Volodin. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Checks if a variable is contained in the list of given scope variables.
     * @param {Object} variable The variable to check.
     * @param {Array} scopeVars The scope variables to look for.
     * @returns {boolean} Whether or not the variable is contains in the list of scope variables.
     */
    function isContainedInScopeVars(variable, scopeVars) {
        return scopeVars.some(function (scopeVar) {
            if (scopeVar.identifiers.length > 0) {
                return variable.name === scopeVar.name;
            }
            return false;
        });
    }

    /**
     * Checks if the given variables are shadowed in the given scope.
     * @param {Array} variables The variables to look for
     * @param {Object} scope The scope to be checked.
     * @returns {void}
     */
    function checkShadowsInScope(variables, scope) {
        variables.forEach(function (variable) {
            if (isContainedInScopeVars(variable, scope.variables) &&
                    // "arguments" is a special case that has no identifiers (#1759)
                    variable.identifiers.length > 0
            ) {

                context.report(variable.identifiers[0], "{{a}} is already declared in the upper scope.", {a: variable.name});
            }
        });
    }

    /**
     * Checks the current context for shadowed variables.
     * @returns {void}
     */
    function checkForShadows() {
        var scope = context.getScope(),
            variables = scope.variables;

        // iterate through the array of variables and find duplicates with the upper scope
        var upper = scope.upper;
        while (upper) {
            checkShadowsInScope(variables, upper);
            upper = upper.upper;
        }
    }

    return {
        "FunctionDeclaration": checkForShadows,
        "FunctionExpression": checkForShadows
    };

};

},{}],234:[function(require,module,exports){
/**
 * @fileoverview Rule to disallow whitespace before the semicolon
 * @author Jonathan Kingston
 * @copyright 2015 Mathias Schreck
 * @copyright 2014 Jonathan Kingston
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Determines whether two adjacent tokens are have whitespace between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is space between the tokens.
     */
    function isSpaced(left, right) {
        return left.range[1] < right.range[0];
    }

    /**
     * Checks whether two tokens are on the same line.
     * @param {Object} left The leftmost token.
     * @param {Object} right The rightmost token.
     * @returns {boolean} True if the tokens are on the same line, false if not.
     * @private
     */
    function isSameLine(left, right) {
        return left.loc.end.line === right.loc.start.line;
    }

    /**
     * Checks if a given token has leading whitespace.
     * @param {Object} token The token to check.
     * @returns {boolean} True if the given token has leading space, false if not.
     */
    function hasLeadingSpace(token) {
        var tokenBefore = context.getTokenBefore(token);
        return isSameLine(tokenBefore, token) && isSpaced(tokenBefore, token);
    }

    /**
     * Checks if the given token is a semicolon.
     * @param {Token} token The token to check.
     * @returns {boolean} Whether or not the given token is a semicolon.
     */
    function isSemicolon(token) {
        return token.type === "Punctuator" && token.value === ";";
    }

    /**
     * Reports if the given token has leading space.
     * @param {Token} token The semicolon token to check.
     * @param {ASTNode} node The corresponding node of the token.
     * @returns {void}
     */
    function checkSemiTokenForLeadingSpace(token, node) {
        if (isSemicolon(token) && hasLeadingSpace(token)) {
            context.report(node, token.loc.start, "Unexpected whitespace before semicolon.");
        }
    }

    /**
     * Checks leading space before the semicolon with the assumption that the last token is the semicolon.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     */
    function checkNode(node) {
        var token = context.getLastToken(node);
        checkSemiTokenForLeadingSpace(token, node);
    }

    return {
        "VariableDeclaration": checkNode,
        "ExpressionStatement": checkNode,
        "BreakStatement": checkNode,
        "ContinueStatement": checkNode,
        "DebuggerStatement": checkNode,
        "ReturnStatement": checkNode,
        "ThrowStatement": checkNode,
        "ForStatement": function (node) {
            if (node.init) {
                checkSemiTokenForLeadingSpace(context.getTokenAfter(node.init), node);
            }

            if (node.test) {
                checkSemiTokenForLeadingSpace(context.getTokenAfter(node.test), node);
            }
        }
    };
};

},{}],235:[function(require,module,exports){
/**
 * @fileoverview Rule to check that spaced function application
 * @author Matt DuVall <http://www.mattduvall.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function detectOpenSpaces(node) {
        var lastCalleeToken = context.getLastToken(node.callee);
        var tokens = context.getTokens(node);
        var i = tokens.indexOf(lastCalleeToken), l = tokens.length;
        while (i < l && tokens[i].value !== "(") {
            ++i;
        }
        if (i >= l) {
            return;
        }
        // look for a space between the callee and the open paren
        if (tokens[i - 1].range[1] !== tokens[i].range[0]) {
            context.report(node, "Unexpected space between function name and paren.");
        }
    }

    return {
        "CallExpression": detectOpenSpaces,
        "NewExpression": detectOpenSpaces
    };

};

},{}],236:[function(require,module,exports){
/**
 * @fileoverview Disallow sparse arrays
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "ArrayExpression": function(node) {

            var emptySpot = node.elements.indexOf(null) > -1;

            if (emptySpot) {
                context.report(node, "Unexpected comma in middle of array.");
            }
        }

    };

};

},{}],237:[function(require,module,exports){
/**
 * @fileoverview Rule to check for properties whose identifier ends with the string Sync
 * @author Matt DuVall<http://mattduvall.com/>
 */

/*jshint node:true*/

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "MemberExpression": function(node) {
            var propertyName = node.property.name,
                syncRegex = /.*Sync$/;

            if (syncRegex.exec(propertyName) !== null) {
                context.report(node, "Unexpected sync method: '" + propertyName + "'.");
            }
        }
    };

};

},{}],238:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of ternary operators.
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "ConditionalExpression": function(node) {
            context.report(node, "Ternary operator used.");
        }

    };

};

},{}],239:[function(require,module,exports){
/**
 * @fileoverview Rule to restrict what can be thrown as an exception.
 * @author Dieter Oberkofler
 * @copyright 2015 Dieter Oberkofler. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "ThrowStatement": function(node) {

            if (node.argument.type === "Literal") {
                context.report(node, "Do not throw a literal.");
            } else if (node.argument.type === "Identifier") {
                if (node.argument.name === "undefined") {
                    context.report(node, "Do not throw undefined.");
                }
            }

        }

    };

};

},{}],240:[function(require,module,exports){
/**
 * @fileoverview Disallow trailing spaces at the end of lines.
 * @author Nodeca Team <https://github.com/nodeca>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var TRAILER = "[ \t\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]+$";

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program": function checkTrailingSpaces(node) {

            // Let's hack. Since Esprima does not return whitespace nodes,
            // fetch the source code and do black magic via regexps.

            var src = context.getSource(),
                re = new RegExp(TRAILER, "mg"),
                match, lines, location;

            while ((match = re.exec(src)) !== null) {
                lines = src.slice(0, re.lastIndex).split(/\r?\n/g);

                location = {
                    line: lines.length,
                    column: lines[lines.length - 1].length - match[0].length + 1
                };

                // Passing node is a bit dirty, because message data will contain
                // big text in `source`. But... who cares :) ?
                // One more kludge will not make worse the bloody wizardry of this plugin.
                context.report(node, location, "Trailing spaces not allowed.");
            }
        }

    };
};

},{}],241:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when initializing to undefined
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "VariableDeclarator": function(node) {
            var name = node.id.name;
            var init = node.init && node.init.name;

            if (init === "undefined") {
                context.report(node, "It's not necessary to initialize '{{name}}' to undefined.", { name: name });
            }
        }
    };

};

},{}],242:[function(require,module,exports){
/**
 * @fileoverview Rule to flag references to undeclared variables.
 * @author Mark Macdonald
 * @copyright 2015 Nicholas C. Zakas. All rights reserved.
 * @copyright 2013 Mark Macdonald. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function isImplicitGlobal(variable) {
    return variable.defs.every(function(def) {
        return def.type === "ImplicitGlobalVariable";
    });
}

/**
 * Gets the declared variable, defined in `scope`, that `ref` refers to.
 * @param {Scope} scope The scope in which to search.
 * @param {Reference} ref The reference to find in the scope.
 * @returns {Variable} The variable, or null if ref refers to an undeclared variable.
 */
function getDeclaredGlobalVariable(scope, ref) {
    var declaredGlobal = null;
    scope.variables.some(function(variable) {
        if (variable.name === ref.identifier.name) {
            // If it's an implicit global, it must have a `writeable` field (indicating it was declared)
            if (!isImplicitGlobal(variable) || {}.hasOwnProperty.call(variable, "writeable")) {
                declaredGlobal = variable;
                return true;
            }
        }
        return false;
    });
    return declaredGlobal;
}

/**
 * Checks if the given node is the argument of a typeof operator.
 * @param {ASTNode} node The AST node being checked.
 * @returns {boolean} Whether or not the node is the argument of a typeof operator.
 */
function hasTypeOfOperator(node) {
    var parent = node.parent;
    return parent.type === "UnaryExpression" && parent.operator === "typeof";
}

/**
 * Checks if a node name match the JSX tag convention.
 * @param {String} name - Name of the node to check.
 * @returns {boolean} Whether or not the node name match the JSX tag convention.
 */
var tagConvention = /^[a-z]|\-/;
function isTagName(name) {
    return tagConvention.test(name);
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var NOT_DEFINED_MESSAGE = "'{{name}}' is not defined.",
        READ_ONLY_MESSAGE = "'{{name}}' is read only.";

    /**
     * Compare an identifier with the variables declared in the scope
     * @param {ASTNode} node - Identifier or JSXIdentifier node
     * @returns {void}
     */
    function checkIdentifierInJSX(node) {
        var scope = context.getScope(),
            variables = scope.variables,
            i,
            len;

        while (scope.type !== "global") {
            scope = scope.upper;
            variables = scope.variables.concat(variables);
        }

        for (i = 0, len = variables.length; i < len; i++) {

            if (variables[i].name === node.name) {
                return;
            }
        }

        context.report(node, NOT_DEFINED_MESSAGE, { name: node.name });
    }

    return {

        "Program:exit": function(/*node*/) {

            var globalScope = context.getScope();

            globalScope.through.forEach(function(ref) {
                var variable = getDeclaredGlobalVariable(globalScope, ref),
                    name = ref.identifier.name;

                if (hasTypeOfOperator(ref.identifier)) {
                    return;
                }

                if (!variable) {
                    context.report(ref.identifier, NOT_DEFINED_MESSAGE, { name: name });
                } else if (ref.isWrite() && variable.writeable === false) {
                    context.report(ref.identifier, READ_ONLY_MESSAGE, { name: name });
                }
            });
        },

        "JSXOpeningElement": function(node) {
            if (!isTagName(node.name.name)) {
                checkIdentifierInJSX(node.name);
            }
        }

    };

};

},{}],243:[function(require,module,exports){
/**
 * @fileoverview Rule to flag references to the undefined variable.
 * @author Michael Ficarra
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Identifier": function(node) {
            if (node.name === "undefined") {
                var parent = context.getAncestors().pop();
                if (!parent || parent.type !== "MemberExpression" || node !== parent.property || parent.computed) {
                    context.report(node, "Unexpected use of undefined.");
                }
            }
        }
    };

};

},{}],244:[function(require,module,exports){
/**
 * @fileoverview Rule to flag trailing underscores in variable declarations.
 * @author Matt DuVall <http://www.mattduvall.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //-------------------------------------------------------------------------
    // Helpers
    //-------------------------------------------------------------------------

    function hasTrailingUnderscore(identifier) {
        var len = identifier.length;

        return identifier !== "_" && (identifier[0] === "_" || identifier[len - 1] === "_");
    }

    function isSpecialCaseIdentifierForMemberExpression(identifier) {
        return identifier === "__proto__";
    }

    function isSpecialCaseIdentifierInVariableExpression(identifier) {
        // Checks for the underscore library usage here
        return identifier === "_";
    }

    function checkForTrailingUnderscoreInFunctionDeclaration(node) {
        var identifier = node.id.name;

        if (typeof identifier !== "undefined" && hasTrailingUnderscore(identifier)) {
            context.report(node, "Unexpected dangling '_' in '" + identifier + "'.");
        }
    }

    function checkForTrailingUnderscoreInVariableExpression(node) {
        var identifier = node.id.name;

        if (typeof identifier !== "undefined" && hasTrailingUnderscore(identifier) &&
            !isSpecialCaseIdentifierInVariableExpression(identifier)) {
            context.report(node, "Unexpected dangling '_' in '" + identifier + "'.");
        }
    }

    function checkForTrailingUnderscoreInMemberExpression(node) {
        var identifier = node.property.name;

        if (typeof identifier !== "undefined" && hasTrailingUnderscore(identifier) &&
            !isSpecialCaseIdentifierForMemberExpression(identifier)) {
            context.report(node, "Unexpected dangling '_' in '" + identifier + "'.");
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": checkForTrailingUnderscoreInFunctionDeclaration,
        "VariableDeclarator": checkForTrailingUnderscoreInVariableExpression,
        "MemberExpression": checkForTrailingUnderscoreInMemberExpression
    };

};

},{}],245:[function(require,module,exports){
/**
 * @fileoverview Checks for unreachable code due to return, throws, break, and continue.
 * @author Joel Feenstra
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------


function report(context, node, unreachableType) {
    var keyword;
    switch (unreachableType) {
        case "BreakStatement":
            keyword = "break";
            break;
        case "ContinueStatement":
            keyword = "continue";
            break;
        case "ReturnStatement":
            keyword = "return";
            break;
        case "ThrowStatement":
            keyword = "throw";
            break;
        default:
            return;
    }
    context.report(node, "Found unexpected statement after a {{type}}.", { type: keyword });
}


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Checks if a node is an exception for no-unreachable because of variable/function hoisting
     * @param {ASTNode} node The AST node to check.
     * @returns {boolean} if the node doesn't trigger unreachable
     * @private
     */
    function isUnreachableAllowed(node) {
        return node.type === "FunctionDeclaration" ||
            node.type === "VariableDeclaration" &&
            node.declarations.every(function(declaration) {
                return declaration.type === "VariableDeclarator" && declaration.init === null;
            });
    }

    /*
     * Verifies that the given node is the last node or followed exclusively by
     * hoisted declarations
     * @param {ASTNode} node Node that should be the last node
     * @returns {void}
     * @private
     */
    function checkNode(node) {
        var parent = context.getAncestors().pop();
        var field, i, sibling;

        switch (parent.type) {
            case "SwitchCase":
                field = "consequent";
                break;
            case "Program":
            case "BlockStatement":
                field = "body";
                break;
            default:
                return;
        }

        for (i = parent[field].length - 1; i >= 0; i--) {
            sibling = parent[field][i];
            if (sibling === node) {
                return; // Found the last reachable statement, all done
            }

            if (!isUnreachableAllowed(sibling)) {
                report(context, sibling, node.type);
            }
        }
    }

    return {
        "ReturnStatement": checkNode,
        "ThrowStatement": checkNode,
        "ContinueStatement": checkNode,
        "BreakStatement": checkNode
    };

};

},{}],246:[function(require,module,exports){
/**
 * @fileoverview Flag expressions in statement position that do not side effect
 * @author Michael Ficarra
 * @copyright 2013 Michael Ficarra. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * @param {ASTNode} node - any node
     * @returns {Boolean} whether the given node structurally represents a directive
     */
    function looksLikeDirective(node) {
        return node.type === "ExpressionStatement" &&
            node.expression.type === "Literal" && typeof node.expression.value === "string";
    }

    /**
     * @param {Function} predicate - ([a] -> Boolean) the function used to make the determination
     * @param {a[]} list - the input list
     * @returns {a[]} the leading sequence of members in the given list that pass the given predicate
     */
    function takeWhile(predicate, list) {
        for (var i = 0, l = list.length; i < l; ++i) {
            if (!predicate(list[i])) {
                break;
            }
        }
        return [].slice.call(list, 0, i);
    }

    /**
     * @param {ASTNode} node - a Program or BlockStatement node
     * @returns {ASTNode[]} the leading sequence of directive nodes in the given node's body
     */
    function directives(node) {
        return takeWhile(looksLikeDirective, node.body);
    }

    /**
     * @param {ASTNode} node - any node
     * @param {ASTNode[]} ancestors - the given node's ancestors
     * @returns {Boolean} whether the given node is considered a directive in its current position
     */
    function isDirective(node, ancestors) {
        var parent = ancestors[ancestors.length - 1],
            grandparent = ancestors[ancestors.length - 2];
        return (parent.type === "Program" || parent.type === "BlockStatement" &&
                (/Function/.test(grandparent.type))) &&
                directives(parent).indexOf(node) >= 0;
    }

    return {
        "ExpressionStatement": function(node) {

            var type = node.expression.type,
                ancestors = context.getAncestors();

            if (
                !/^(?:Assignment|Call|New|Update|Yield)Expression$/.test(type) &&
                (type !== "UnaryExpression" || ["delete", "void"].indexOf(node.expression.operator) < 0) &&
                !isDirective(node, ancestors)
            ) {
                context.report(node, "Expected an assignment or function call and instead saw an expression.");
            }
        }
    };

};

},{}],247:[function(require,module,exports){
/**
 * @fileoverview Rule to flag declared but unused variables
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var MESSAGE = "{{name}} is defined but never used";

    var config = {
        vars: "all",
        args: "after-used"
    };

    if (context.options[0]) {
        if (typeof context.options[0] === "string") {
            config.vars = context.options[0];
        } else {
            config.vars = context.options[0].vars || config.vars;
            config.args = context.options[0].args || config.args;
        }
    }

    /**
     * Determines if a given variable is being exported from a module.
     * @param {Variable} variable EScope variable object.
     * @returns {boolean} True if the variable is exported, false if not.
     * @private
     */
    function isExported(variable) {

        var definition = variable.defs[0];

        if (definition) {

            definition = definition.node;
            if (definition.type === "VariableDeclarator") {
                definition = definition.parent;
            }

            return definition.parent.type.indexOf("Export") === 0;
        } else {
            return false;
        }
    }

    /**
     * @param {Reference} ref - an escope Reference
     * @returns {Boolean} whether the given reference represents a read operation
     */
    function isReadRef(ref) {
        return ref.isRead();
    }

    /**
     * Gets an array of local variables without read references.
     * @param {Scope} scope - an escope Scope object
     * @returns {Variable[]} most of the local variables with no read references
     */
    function getUnusedLocals(scope) {
        var unused = [];
        var variables = scope.variables;

        if (scope.type !== "global" && scope.type !== "TDZ") {
            for (var i = 0, l = variables.length; i < l; ++i) {

                // skip function expression names
                if (scope.functionExpressionScope || variables[i].eslintJSXUsed) {
                    continue;
                }
                // skip implicit "arguments" variable
                if (scope.type === "function" && variables[i].name === "arguments" && variables[i].identifiers.length === 0) {
                    continue;
                }
                var type = variables[i].defs[0].type;

                // skip catch variables
                if (type === "CatchClause") {
                    continue;
                }
                // if "args" option is "none", skip any parameter
                if (config.args === "none" && type === "Parameter") {
                    continue;
                }

                // if "args" option is "after-used", skip all but the last parameter
                if (config.args === "after-used" && type === "Parameter" && variables[i].defs[0].index < variables[i].defs[0].node.params.length - 1) {
                    continue;
                }

                if (variables[i].references.filter(isReadRef).length === 0 && !isExported(variables[i])) {
                    unused.push(variables[i]);
                }
            }
        }

        return [].concat.apply(unused, scope.childScopes.map(getUnusedLocals));
    }

    /**
     * @param {String} nodeName - Name of the node to check.
     * @returns {void}
     */
    function flagVariableAsUsedInJSX(nodeName) {
        var scope = context.getScope(),
            variables = scope.variables,
            i,
            len;

        while (scope.type !== "global") {
            scope = scope.upper;
            variables = [].concat.apply(scope.variables, variables);
        }

        // mark JSXIdentifiers with a special flag
        for (i = 0, len = variables.length; i < len; i++) {
            if (variables[i].name === nodeName) {
                variables[i].eslintJSXUsed = true;
                break;
            }
        }
    }

    return {
        "Program:exit": function(programNode) {
            var globalScope = context.getScope();
            var unused = getUnusedLocals(globalScope);
            var i, l;

            // determine unused globals
            if (config.vars === "all") {
                var unresolvedRefs = globalScope.through.filter(isReadRef).map(function(ref) {
                    return ref.identifier.name;
                });

                for (i = 0, l = globalScope.variables.length; i < l; ++i) {
                    if (unresolvedRefs.indexOf(globalScope.variables[i].name) < 0 &&
                            !globalScope.variables[i].eslintJSXUsed && !isExported(globalScope.variables[i])) {
                        unused.push(globalScope.variables[i]);
                    }
                }
            }

            for (i = 0, l = unused.length; i < l; ++i) {
                if (unused[i].eslintExplicitGlobal) {
                    context.report(programNode, MESSAGE, unused[i]);
                } else if (unused[i].defs.length > 0) {

                    // TODO: Remove when https://github.com/estools/escope/issues/49 is resolved
                    if (unused[i].defs[0].type === "ClassName") {
                        continue;
                    }

                    context.report(unused[i].identifiers[0], MESSAGE, unused[i]);
                }
            }
        },

        "JSXExpressionContainer": function(node) {
            if (node.expression.type === "Identifier") {
                flagVariableAsUsedInJSX(node.expression.name);
            }
        },

        "JSXIdentifier": function(node) {
            flagVariableAsUsedInJSX(node.name);
        }
    };

};

},{}],248:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of variables before they are defined
 * @author Ilya Volodin
 * @copyright 2013 Ilya Volodin. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var NO_FUNC = "nofunc";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function findDeclaration(name, scope) {
        // try searching in the current scope first
        for (var i = 0, l = scope.variables.length; i < l; i++) {
            if (scope.variables[i].name === name) {
                return scope.variables[i];
            }
        }
        // check if there's upper scope and call recursivly till we find the variable
        if (scope.upper) {
            return findDeclaration(name, scope.upper);
        }
    }

    function findVariables() {
        var scope = context.getScope();
        var typeOption = context.options[0];

        function checkLocationAndReport(reference, declaration) {
            if (typeOption !== NO_FUNC || declaration.defs[0].type !== "FunctionName") {
                if (declaration.identifiers[0].range[1] > reference.identifier.range[1]) {
                    context.report(reference.identifier, "{{a}} was used before it was defined", {a: reference.identifier.name});
                }
            }
        }

        scope.references.forEach(function(reference) {
            // if the reference is resolved check for declaration location
            // if not, it could be function invocation, try to find manually
            if (reference.resolved && reference.resolved.identifiers.length > 0) {
                checkLocationAndReport(reference, reference.resolved);
            } else {
                var declaration = findDeclaration(reference.identifier.name, scope);
                // if there're no identifiers, this is a global environment variable
                if (declaration && declaration.identifiers.length !== 0) {
                    checkLocationAndReport(reference, declaration);
                }
            }
        });
    }

    return {
        "Program": findVariables,
        "FunctionExpression": findVariables,
        "FunctionDeclaration": findVariables,
        "ArrowFunctionExpression": findVariables
    };
};

},{}],249:[function(require,module,exports){
/**
 * @fileoverview Rule to check for the usage of var.
 * @author Jamund Ferguson
 * @copyright 2014 Jamund Ferguson. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "VariableDeclaration": function (node) {
            if (node.kind === "var") {
                context.report(node, "Unexpected var, use let or const instead.");
            }
        }

    };

};

},{}],250:[function(require,module,exports){
/**
 * @fileoverview Rule to disallow use of void operator.
 * @author Mike Sidorov
 * @copyright 2014 Mike Sidorov. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "UnaryExpression": function(node) {
            if (node.operator === "void") {
                context.report(node, "Expected 'undefined' and instead saw 'void'.");
            }
        }
    };

};

},{}],251:[function(require,module,exports){
/**
 * @fileoverview Rule that warns about used warning comments
 * @author Alexander Schmidt <https://github.com/lxanders>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var configuration = context.options[0] || {},
        warningTerms = configuration.terms || ["todo", "fixme", "xxx"],
        location = configuration.location || "start",
        warningRegExps;

    /**
     * Convert a warning term into a RegExp which will match a comment containing that whole word in the specified
     * location ("start" or "anywhere"). If the term starts or ends with non word characters, then the match will not
     * require word boundaries on that side.
     *
     * @param {String} term A term to convert to a RegExp
     * @returns {RegExp} The term converted to a RegExp
     */
    function convertToRegExp(term) {
        var escaped = term.replace(/[-\/\\$\^*+?.()|\[\]{}]/g, "\\$&"),
            // If the term ends in a word character (a-z0-9_), ensure a word boundary at the end, so that substrings do
            // not get falsely matched. eg "todo" in a string such as "mastodon".
            // If the term ends in a non-word character, then \b won't match on the boundary to the next non-word
            // character, which would likely be a space. For example `/\bFIX!\b/.test('FIX! blah') === false`.
            // In these cases, use no bounding match. Same applies for the prefix, handled below.
            suffix = /\w$/.test(term) ? "\\b" : "",
            prefix;

        if (location === "start") {
            // When matching at the start, ignore leading whitespace, and there's no need to worry about word boundaries
            prefix = "^\\s*";
        } else if (/^\w/.test(term)) {
            prefix = "\\b";
        } else {
            prefix = "";
        }

        return new RegExp(prefix + escaped + suffix, "i");
    }

    /**
     * Checks the specified comment for matches of the configured warning terms and returns the matches.
     * @param {String} comment The comment which is checked.
     * @returns {Array} All matched warning terms for this comment.
     */
    function commentContainsWarningTerm(comment) {
        var matches = [];

        warningRegExps.forEach(function (regex, index) {
            if (regex.test(comment)) {
                matches.push(warningTerms[index]);
            }
        });

        return matches;
    }

    /**
     * Checks the specified node for matching warning comments and reports them.
     * @param {ASTNode} node The AST node being checked.
     * @returns {void} undefined.
     */
    function checkComment(node) {
        var matches = commentContainsWarningTerm(node.value);

        matches.forEach(function (matchedTerm) {
            context.report(node, "Unexpected " + matchedTerm + " comment.");
        });
    }

    warningRegExps = warningTerms.map(convertToRegExp);
    return {
        "BlockComment": checkComment,
        "LineComment": checkComment
    };
};

},{}],252:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of with statement
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "WithStatement": function(node) {
            context.report(node, "Unexpected use of 'with' statement.");
        }
    };

};

},{}],253:[function(require,module,exports){
/**
 * @fileoverview Rule to flag wrapping non-iife in parens
 * @author Ilya Volodin
 * @copyright 2013 Ilya Volodin. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Checks a function expression to see if its surrounded by parens.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     * @private
     */
    function checkFunction(node) {
        var ancestors = context.getAncestors(),
            previousToken, nextToken;

        if (!/CallExpression|NewExpression/.test(ancestors.pop().type)) {
            previousToken = context.getTokenBefore(node);
            nextToken = context.getTokenAfter(node);
            if (previousToken.value === "(" && nextToken.value === ")") {
                context.report(node, "Wrapping non-IIFE function literals in parens is unnecessary.");
            }
        }
    }

    return {
        "ArrowFunctionExpression": checkFunction,
        "FunctionExpression": checkFunction
    };

};

},{}],254:[function(require,module,exports){
/**
 * @fileoverview A rule to ensure the use of a single variable declaration.
 * @author Ian Christian Myers
 * @copyright 2013 Ian Christian Myers. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    var functionStack = [];

    function startFunction() {
        functionStack.push(false);
    }

    function endFunction() {
        functionStack.pop();
    }

    function checkDeclarations(node) {
        if (functionStack[functionStack.length - 1]) {
            context.report(node, "Combine this with the previous 'var' statement.");
        } else {
            functionStack[functionStack.length - 1] = true;
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "Program": startFunction,
        "FunctionDeclaration": startFunction,
        "FunctionExpression": startFunction,
        "ArrowFunctionExpression": startFunction,

        "VariableDeclaration": checkDeclarations,

        "Program:exit": endFunction,
        "FunctionDeclaration:exit": endFunction,
        "FunctionExpression:exit": endFunction,
        "ArrowFunctionExpression:exit": endFunction
    };

};

},{}],255:[function(require,module,exports){
/**
 * @fileoverview Rule to replace assignment expressions with operator assignment
 * @author Brandon Mills
 * @copyright 2014 Brandon Mills. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks whether an operator is commutative and has an operator assignment
 * shorthand form.
 * @param   {string}  operator Operator to check.
 * @returns {boolean}          True if the operator is commutative and has a
 *     shorthand form.
 */
function isCommutativeOperatorWithShorthand(operator) {
    return ["*", "&", "^", "|"].indexOf(operator) >= 0;
}

/**
 * Checks whether an operator is not commuatative and has an operator assignment
 * shorthand form.
 * @param   {string}  operator Operator to check.
 * @returns {boolean}          True if the operator is not commuatative and has
 *     a shorthand form.
 */
function isNonCommutativeOperatorWithShorthand(operator) {
    return ["+", "-", "/", "%", "<<", ">>", ">>>"].indexOf(operator) >= 0;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Checks whether two expressions reference the same value. For example:
 *     a = a
 *     a.b = a.b
 *     a[0] = a[0]
 *     a['b'] = a['b']
 * @param   {ASTNode} a Left side of the comparison.
 * @param   {ASTNode} b Right side of the comparison.
 * @returns {boolean}   True if both sides match and reference the same value.
 */
function same(a, b) {
    if (a.type !== b.type) {
        return false;
    }

    switch (a.type) {
        case "Identifier":
            return a.name === b.name;
        case "Literal":
            return a.value === b.value;
        case "MemberExpression":
            // x[0] = x[0]
            // x[y] = x[y]
            // x.y = x.y
            return same(a.object, b.object) && same(a.property, b.property);
        default:
            return false;
    }
}

module.exports = function(context) {

    /**
     * Ensures that an assignment uses the shorthand form where possible.
     * @param   {ASTNode} node An AssignmentExpression node.
     * @returns {void}
     */
    function verify(node) {
        var expr, left, operator;

        if (node.operator !== "=" || node.right.type !== "BinaryExpression") {
            return;
        }

        left = node.left;
        expr = node.right;
        operator = expr.operator;

        if (isCommutativeOperatorWithShorthand(operator)) {
            if (same(left, expr.left) || same(left, expr.right)) {
                context.report(node, "Assignment can be replaced with operator assignment.");
            }
        } else if (isNonCommutativeOperatorWithShorthand(operator)) {
            if (same(left, expr.left)) {
                context.report(node, "Assignment can be replaced with operator assignment.");
            }
        }
    }

    /**
     * Warns if an assignment expression uses operator assignment shorthand.
     * @param   {ASTNode} node An AssignmentExpression node.
     * @returns {void}
     */
    function prohibit(node) {
        if (node.operator !== "=") {
            context.report(node, "Unexpected operator assignment shorthand.");
        }
    }

    return {
        "AssignmentExpression": context.options[0] !== "never" ? verify : prohibit
    };

};

},{}],256:[function(require,module,exports){
/**
 * @fileoverview A rule to ensure blank lines within blocks.
 * @author Mathias Schreck <https://github.com/lo1tuma>
 * @copyright 2014 Mathias Schreck. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var requirePadding = context.options[0] !== "never";

    /**
     * Checks if the given non empty block node has a blank line before its first child node.
     * @param {ASTNode} node The AST node of a BlockStatement.
     * @returns {boolean} Whether or not the block starts with a blank line.
     */
    function isNonEmptyBlockTopPadded(node) {
        var blockStart = node.loc.start.line,
            first = node.body[0],
            firstLine = first.loc.start.line,
            expectedFirstLine = blockStart + 2,
            leadingComments = context.getComments(first).leading;

        if (leadingComments.length > 0) {
            firstLine = leadingComments[0].loc.start.line;
        }

        return expectedFirstLine <= firstLine;
    }

    /**
     * Checks if the given non empty block node has a blank line after its last child node.
     * @param {ASTNode} node The AST node of a BlockStatement.
     * @returns {boolean} Whether or not the block ends with a blank line.
     */
    function isNonEmptyBlockBottomPadded(node) {
        var blockEnd = node.loc.end.line,
            last = node.body[node.body.length - 1],
            lastLine = last.loc.end.line,
            expectedLastLine = blockEnd - 2,
            trailingComments = context.getComments(last).trailing;

        if (trailingComments.length > 0) {
            lastLine = trailingComments[trailingComments.length - 1].loc.end.line;
        }

        return lastLine <= expectedLastLine;
    }

    /**
     * Checks if the given non empty block node starts AND ends with a blank line.
     * @param {ASTNode} node The AST node of a BlockStatement.
     * @returns {boolean} Whether or not the block starts and ends with a blank line.
     */
    function isNonEmptyBlockPadded(node) {
        return isNonEmptyBlockTopPadded(node) && isNonEmptyBlockBottomPadded(node);
    }

    /**
     * Checks if the given non empty block node starts OR ends with a blank line.
     * @param {ASTNode} node The AST node of a BlockStatement.
     * @returns {boolean} Whether or not the block starts and ends with a blank line.
     */
    function hasNonEmptyBlockExtraPadding(node) {
        return isNonEmptyBlockTopPadded(node) || isNonEmptyBlockBottomPadded(node);
    }

    /**
     * Checks the given BlockStatement node to be padded if the block is not empty.
     * @param {ASTNode} node The AST node of a BlockStatement.
     * @returns {void} undefined.
     */
    function checkPadding(node) {
        if (node.body.length > 0) {
            if (requirePadding) {
                if (!isNonEmptyBlockPadded(node)) {
                    context.report(node, "Block must be padded by blank lines.");
                }
            } else {
                if (hasNonEmptyBlockExtraPadding(node)) {
                    context.report(node, "Block must not be padded by blank lines.");
                }
            }
        }
    }

    return {
        "BlockStatement": checkPadding
    };

};

},{}],257:[function(require,module,exports){
/**
 * @fileoverview Rule to flag non-quoted property names in object literals.
 * @author Mathias Bynens <http://mathiasbynens.be/>
 * @copyright 2014 Brandon Mills. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var espree = require("espree");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var MODE = context.options[0];

    /**
     * Ensures that a property's key is quoted only when necessary
     * @param   {ASTNode} node Property AST node
     * @returns {void}
     */
    function asNeeded(node) {
        var key = node.key,
            tokens;

        if (key.type === "Literal" && typeof key.value === "string") {
            try {
                tokens = espree.tokenize(key.value);
            } catch (e) {
                return;
            }

            if (tokens.length === 1 &&
                (["Identifier", "Null", "Boolean"].indexOf(tokens[0].type) >= 0 ||
                (tokens[0].type === "Numeric" && "" + +tokens[0].value === tokens[0].value))
            ) {
                context.report(node, "Unnecessarily quoted property `{{value}}` found.", key);
            }
        }
    }

    /**
     * Ensures that a property's key is quoted
     * @param   {ASTNode} node Property AST node
     * @returns {void}
     */
    function always(node) {
        var key = node.key;

        if (!(key.type === "Literal" && typeof key.value === "string")) {
            context.report(node, "Unquoted property `{{key}}` found.", {
                key: key.name || key.value
            });
        }
    }

    return {
        "Property": MODE === "as-needed" ? asNeeded : always
    };

};

},{"espree":"espree"}],258:[function(require,module,exports){
/**
 * @fileoverview A rule to choose between single and double quote marks
 * @author Matt DuVall <http://www.mattduvall.com/>, Brandon Payton
 */

"use strict";

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var QUOTE_SETTINGS = {
    "double": {
        quote: "\"",
        alternateQuote: "'",
        description: "doublequote"
    },
    "single": {
        quote: "'",
        alternateQuote: "\"",
        description: "singlequote"
    }
};

var AVOID_ESCAPE = "avoid-escape";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Validate that a string passed in is surrounded by the specified character
     * @param  {string} val The text to check.
     * @param  {string} character The character to see if it's surrounded by.
     * @returns {boolean} True if the text is surrounded by the character, false if not.
     * @private
     */
    function isSurroundedBy(val, character) {
        return val[0] === character && val[val.length - 1] === character;
    }

    /**
     * Determines if a given node is part of JSX syntax.
     * @param {ASTNode} node The node to check.
     * @returns {boolean} True if the node is a JSX node, false if not.
     * @private
     */
    function isJSXElement(node) {
        return node.type.indexOf("JSX") === 0;
    }

    return {

        "Literal": function(node) {
            var val = node.value,
                rawVal = node.raw,
                quoteOption = context.options[0],
                settings = QUOTE_SETTINGS[quoteOption],
                avoidEscape = context.options[1] === AVOID_ESCAPE,
                isValid;

            if (settings && typeof val === "string") {
                isValid = isJSXElement(node.parent) || isSurroundedBy(rawVal, settings.quote);

                if (!isValid && avoidEscape) {
                    isValid = isSurroundedBy(rawVal, settings.alternateQuote) && rawVal.indexOf(settings.quote) >= 0;
                }

                if (!isValid) {
                    context.report(node, "Strings must use " + settings.description + ".");
                }
            }
        }
    };

};

},{}],259:[function(require,module,exports){
/**
 * @fileoverview Rule to flag use of parseInt without a radix argument
 * @author James Allardice
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {
        "CallExpression": function(node) {

            var radix;

            if (node.callee.name === "parseInt") {

                if (node.arguments.length < 2) {
                    context.report(node, "Missing radix parameter.");
                } else {

                    radix = node.arguments[1];

                    // don't allow non-numeric literals or undefined
                    if ((radix.type === "Literal" && typeof radix.value !== "number") ||
                        (radix.type === "Identifier" && radix.name === "undefined")
                    ) {
                        context.report(node, "Invalid radix parameter.");
                    }
                }

            }
        }
    };

};

},{}],260:[function(require,module,exports){
/**
 * @fileoverview Validates spacing before and after semicolon
 * @author Mathias Schreck
 * @copyright 2015 Mathias Schreck
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var config = context.options[0],
        requireSpaceBefore = false,
        requireSpaceAfter = true;

    if (typeof config === "object") {
        if (config.hasOwnProperty("before")) {
            requireSpaceBefore = config.before;
        }
        if (config.hasOwnProperty("after")) {
            requireSpaceAfter = config.after;
        }
    }

    /**
     * Determines whether two adjacent tokens are have whitespace between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is space between the tokens.
     */
    function isSpaced(left, right) {
        return left.range[1] < right.range[0];
    }

    /**
     * Checks whether two tokens are on the same line.
     * @param {Object} left The leftmost token.
     * @param {Object} right The rightmost token.
     * @returns {boolean} True if the tokens are on the same line, false if not.
     * @private
     */
    function isSameLine(left, right) {
        return left.loc.end.line === right.loc.start.line;
    }

    /**
     * Checks if a given token has leading whitespace.
     * @param {Object} token The token to check.
     * @returns {boolean} True if the given token has leading space, false if not.
     */
    function hasLeadingSpace(token) {
        var tokenBefore = context.getTokenBefore(token);
        return tokenBefore && isSameLine(tokenBefore, token) && isSpaced(tokenBefore, token);
    }

    /**
     * Checks if a given token has trailing whitespace.
     * @param {Object} token The token to check.
     * @returns {boolean} True if the given token has trailing space, false if not.
     */
    function hasTrailingSpace(token) {
        var tokenAfter = context.getTokenAfter(token);
        return tokenAfter && isSameLine(token, tokenAfter) && isSpaced(token, tokenAfter);
    }

    /**
     * Checks if the given token is the last token in its line.
     * @param {Token} token The token to check.
     * @returns {boolean} Whether or not the token is the last in its line.
     */
    function isLastTokenInCurrentLine(token) {
        var tokenAfter = context.getTokenAfter(token);
        return !(tokenAfter && isSameLine(token, tokenAfter));
    }

    /**
     * Checks if the given token is a semicolon.
     * @param {Token} token The token to check.
     * @returns {boolean} Whether or not the given token is a semicolon.
     */
    function isSemicolon(token) {
        return token.type === "Punctuator" && token.value === ";";
    }

    /**
     * Reports if the given token has invalid spacing.
     * @param {Token} token The semicolon token to check.
     * @param {ASTNode} node The corresponding node of the token.
     * @returns {void}
     */
    function checkSemicolonSpacing(token, node) {
        var location;

        if (isSemicolon(token)) {
            location = token.loc.start;

            if (hasLeadingSpace(token)) {
                if (!requireSpaceBefore) {
                    context.report(node, location, "Unexpected whitespace before semicolon.");
                }
            } else {
                if (requireSpaceBefore) {
                    context.report(node, location, "Missing whitespace before semicolon.");
                }
            }

            if (!isLastTokenInCurrentLine(token)) {
                if (hasTrailingSpace(token)) {
                    if (!requireSpaceAfter) {
                        context.report(node, location, "Unexpected whitespace after semicolon.");
                    }
                } else {
                    if (requireSpaceAfter) {
                        context.report(node, location, "Missing whitespace after semicolon.");
                    }
                }
            }
        }
    }

    /**
     * Checks the spacing of the semicolon with the assumption that the last token is the semicolon.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     */
    function checkNode(node) {
        var token = context.getLastToken(node);
        checkSemicolonSpacing(token, node);
    }

    return {
        "VariableDeclaration": checkNode,
        "ExpressionStatement": checkNode,
        "BreakStatement": checkNode,
        "ContinueStatement": checkNode,
        "DebuggerStatement": checkNode,
        "ReturnStatement": checkNode,
        "ThrowStatement": checkNode,
        "ForStatement": function (node) {
            if (node.init) {
                checkSemicolonSpacing(context.getTokenAfter(node.init), node);
            }

            if (node.test) {
                checkSemicolonSpacing(context.getTokenAfter(node.test), node);
            }
        }
    };
};

},{}],261:[function(require,module,exports){
/**
 * @fileoverview Rule to flag missing semicolons.
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = function(context) {

    var OPT_OUT_PATTERN = /[\[\(\/\+\-]/;

    var always = context.options[0] !== "never";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Check if a semicolon is unnecessary, only true if:
     *   - next token is on a new line and is not one of the opt-out tokens
     *   - next token is a valid statement divider
     * @param {Token} lastToken last token of current node.
     * @param {Token} nextToken next token after current node.
     * @returns {boolean} whether the semicolon is unnecessary.
     */
    function isUnnecessarySemicolon(lastToken, nextToken) {

        var lastTokenLine = lastToken.loc.end.line,
            nextTokenLine = nextToken && nextToken.loc.start.line,
            isOptOutToken = nextToken && OPT_OUT_PATTERN.test(nextToken.value),
            isDivider = nextToken && (nextToken.value === "}" || nextToken.value === ";");

        return (lastTokenLine !== nextTokenLine && !isOptOutToken) || isDivider;
    }

    /**
     * Checks a node to see if it's followed by a semicolon.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     */
    function checkForSemicolon(node) {
        var lastToken = context.getLastToken(node),
            nextToken = context.getTokenAfter(node);

        if (always) {
            if (lastToken.type !== "Punctuator" || lastToken.value !== ";") {
                context.report(node, lastToken.loc.end, "Missing semicolon.");
            }
        } else {
            if (lastToken.type === "Punctuator" &&
                lastToken.value === ";" &&
                isUnnecessarySemicolon(lastToken, nextToken)
            ) {
                context.report(node, node.loc.end, "Extra semicolon.");
            }
        }
    }

    /**
     * Checks to see if there's a semicolon after a variable declaration.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     */
    function checkForSemicolonForVariableDeclaration(node) {

        var ancestors = context.getAncestors(),
            parentIndex = ancestors.length - 1,
            parent = ancestors[parentIndex];

        if ((parent.type !== "ForStatement" || parent.init !== node) &&
            (!/^For(?:In|Of)Statement/.test(parent.type) || parent.left !== node)
        ) {
            checkForSemicolon(node);
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {

        "VariableDeclaration": checkForSemicolonForVariableDeclaration,
        "ExpressionStatement": checkForSemicolon,
        "ReturnStatement": checkForSemicolon,
        "ThrowStatement": checkForSemicolon,
        "DebuggerStatement": checkForSemicolon,
        "BreakStatement": checkForSemicolon,
        "ContinueStatement": checkForSemicolon,
        "EmptyStatement": function (node) {
            var lastToken, nextToken;

            if (!always) {
                lastToken = context.getLastToken(node);
                nextToken = context.getTokenAfter(node) || context.getLastToken(node);

                if (isUnnecessarySemicolon(lastToken, nextToken)) {
                    context.report(node, "Extra semicolon.");
                }
            }


        }
    };

};

},{}],262:[function(require,module,exports){
/**
 * @fileoverview Rule to require sorting of variables within a single Variable Declaration block
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var configuration = context.options[0] || {},
        ignoreCase = configuration.ignoreCase || false;

    return {
        "VariableDeclaration": function(node) {
            node.declarations.reduce(function(memo, decl) {
                var lastVariableName = memo.id.name,
                    currenVariableName = decl.id.name;

                if (ignoreCase) {
                    lastVariableName = lastVariableName.toLowerCase();
                    currenVariableName = currenVariableName.toLowerCase();
                }

                if (currenVariableName < lastVariableName) {
                    context.report(decl, "Variables within the same declaration block should be sorted alphabetically");
                    return memo;
                } else {
                    return decl;
                }
            }, node.declarations[0]);
        }
    };
};

},{}],263:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce consistent spacing after function names
 * @author Roberto Vidal
 * @copyright 2014 Roberto Vidal. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var requiresSpace = context.options[0] === "always";

    /**
     * Reports if the give named function node has the correct spacing after its name
     *
     * @param {ASTNode} node  The node to which the potential problem belongs.
     * @returns {void}
     */
    function check(node) {
        var tokens = context.getFirstTokens(node, 3),
            hasSpace = tokens[1].range[1] < tokens[2].range[0];

        if (hasSpace !== requiresSpace) {
            context.report(node, "Function name \"{{name}}\" must {{not}}be followed by whitespace.", {
                name: node.id.name,
                not: requiresSpace ? "" : "not "
            });
        }
    }

    return {
        "FunctionDeclaration": check,
        "FunctionExpression": function (node) {
            if (node.id) {
                check(node);
            }
        }
    };

};

},{}],264:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce the number of spaces after certain keywords
 * @author Nick Fisher
 * @copyright 2014 Nick Fisher. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // unless the first option is `"never"`, then a space is required
    var requiresSpace = context.options[0] !== "never";

    /**
     * Check if the separation of two adjacent tokens meets the spacing rules, and report a problem if not.
     *
     * @param {ASTNode} node  The node to which the potential problem belongs.
     * @param {Token} left    The first token.
     * @param {Token} right   The second token
     * @returns {void}
     */
    function checkTokens(node, left, right) {
        var hasSpace = left.range[1] < right.range[0],
            value = left.value;

        if (hasSpace !== requiresSpace) {
            context.report(node, "Keyword \"{{value}}\" must {{not}}be followed by whitespace.", {
                value: value,
                not: requiresSpace ? "" : "not "
            });
        }
    }

    /**
     * Check if the given node (`if`, `for`, `while`, etc), has the correct spacing after it.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     */
    function check(node) {
        var tokens = context.getFirstTokens(node, 2);
        checkTokens(node, tokens[0], tokens[1]);
    }

    return {
        "IfStatement": function (node) {
            check(node);
            // check the `else`
            if (node.alternate && node.alternate.type !== "IfStatement") {
                checkTokens(node.alternate, context.getTokenBefore(node.alternate), context.getFirstToken(node.alternate));
            }
        },
        "ForStatement": check,
        "ForOfStatement": check,
        "ForInStatement": check,
        "WhileStatement": check,
        "DoWhileStatement": function (node) {
            check(node);
            // check the `while`
            var whileTokens = context.getTokensBefore(node.test, 2);
            checkTokens(node, whileTokens[0], whileTokens[1]);
        },
        "SwitchStatement": check,
        "TryStatement": function (node) {
            check(node);
            // check the `finally`
            if (node.finalizer) {
                checkTokens(node.finalizer, context.getTokenBefore(node.finalizer), context.getFirstToken(node.finalizer));
            }
        },
        "CatchStatement": check,
        "WithStatement": check
    };
};

},{}],265:[function(require,module,exports){
/**
 * @fileoverview A rule to ensure whitespace before blocks.
 * @author Mathias Schreck <https://github.com/lo1tuma>
 * @copyright 2014 Mathias Schreck. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var requireSpace = context.options[0] !== "never";

    /**
     * Determines whether two adjacent tokens are have whitespace between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is space between the tokens.
     */
    function isSpaced(left, right) {
        return left.range[1] < right.range[0];
    }

    /**
     * Determines whether two adjacent tokens are on the same line.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not the tokens are on the same line.
     */
    function isSameLine(left, right) {
        return left.loc.start.line === right.loc.start.line;
    }

    /**
     * Checks the given BlockStatement node has a preceding space if it doesn’t start on a new line.
     * @param {ASTNode|Token} node The AST node of a BlockStatement.
     * @returns {void} undefined.
     */
    function checkPrecedingSpace(node) {
        var precedingToken = context.getTokenBefore(node),
            hasSpace;

        if (precedingToken && isSameLine(precedingToken, node)) {
            hasSpace = isSpaced(precedingToken, node);

            if (requireSpace) {
                if (!hasSpace) {
                    context.report(node, "Missing space before opening brace.");
                }
            } else {
                if (hasSpace) {
                    context.report(node, "Unexpected space before opening brace.");
                }
            }
        }
    }

    /**
     * Checks if the CaseBlock of an given SwitchStatement node has a preceding space.
     * @param {ASTNode} node The node of a SwitchStatement.
     * @returns {void} undefined.
     */
    function checkSpaceBeforeCaseBlock(node) {
        var cases = node.cases,
            firstCase,
            openingBrace;

        if (cases.length > 0) {
            firstCase = cases[0];
            openingBrace = context.getTokenBefore(firstCase);
        } else {
            openingBrace = context.getLastToken(node, 1);
        }

        checkPrecedingSpace(openingBrace);
    }

    return {
        "BlockStatement": checkPrecedingSpace,
        "SwitchStatement": checkSpaceBeforeCaseBlock
    };

};

},{}],266:[function(require,module,exports){
/**
 * @fileoverview Rule to validate spacing before function parentheses.
 * @author Mathias Schreck <https://github.com/lo1tuma>
 * @copyright 2015 Mathias Schreck
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var configuration = context.options[0],
        requireAnonymousFunctionSpacing = true,
        requireNamedFunctionSpacing = true;

    if (typeof configuration === "object") {
        requireAnonymousFunctionSpacing = configuration.anonymous !== "never";
        requireNamedFunctionSpacing = configuration.named !== "never";
    } else if (configuration === "never") {
        requireAnonymousFunctionSpacing = false;
        requireNamedFunctionSpacing = false;
    }

    /**
     * Determines whether two adjacent tokens are have whitespace between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is space between the tokens.
     */
    function isSpaced(left, right) {
        return left.range[1] < right.range[0];
    }

    /**
     * Determines whether a function has a name.
     * @param {ASTNode} node The function node.
     * @returns {boolean} Whether the function has a name.
     */
    function isNamedFunction(node) {
        var parent;

        if (node.id) {
            return true;
        }

        parent = context.getAncestors().pop();
        return parent.type === "Property" && (
            parent.kind === "get" ||
            parent.kind === "set" ||
            parent.method
        );
    }

    /**
     * Validates the spacing before function parentheses.
     * @param {ASTNode} node The node to be validated.
     * @returns {void}
     */
    function validateSpacingBeforeParentheses(node) {
        var isNamed = isNamedFunction(node),
            tokens,
            leftToken,
            rightToken,
            location;

        if (node.generator && !isNamed) {
            return;
        }

        tokens = context.getTokens(node);

        if (node.generator) {
            leftToken = tokens[2];
            rightToken = tokens[3];
        } else if (isNamed) {
            if (node.id) {
                leftToken = tokens[1];
                rightToken = tokens[2];
            } else {
                // Object methods are named but don't have an id
                leftToken = context.getTokenBefore(node);
                rightToken = tokens[0];
            }
        } else {
            leftToken = tokens[0];
            rightToken = tokens[1];
        }

        location = leftToken.loc.end;

        if (isSpaced(leftToken, rightToken)) {
            if ((isNamed && !requireNamedFunctionSpacing) || (!isNamed && !requireAnonymousFunctionSpacing)) {
                context.report(node, location, "Unexpected space before function parentheses.");
            }
        } else {
            if ((isNamed && requireNamedFunctionSpacing) || (!isNamed && requireAnonymousFunctionSpacing)) {
                context.report(node, location, "Missing space before function parentheses.");
            }
        }
    }

    return {
        "FunctionDeclaration": validateSpacingBeforeParentheses,
        "FunctionExpression": validateSpacingBeforeParentheses
    };
};

},{}],267:[function(require,module,exports){
/**
 * @fileoverview Disallows or enforces spaces inside of brackets.
 * @author Ian Christian Myers
 * @copyright 2014 Brandyn Bennett. All rights reserved.
 * @copyright 2014 Michael Ficarra. No rights reserved.
 * @copyright 2014 Vignesh Anand. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var spaced = context.options[0] === "always";

    /**
     * Determines whether an option is set, relative to the spacing option.
     * If spaced is "always", then check whether option is set to false.
     * If spaced is "never", then check whether option is set to true.
     * @param {Object} option - The option to exclude.
     * @returns {boolean} Whether or not the property is excluded.
     */
    function isOptionSet(option) {
        return context.options[1] != null ? context.options[1][option] === !spaced : false;
    }

    var options = {
        spaced: spaced,
        singleElementException: isOptionSet("singleValue"),
        objectsInArraysException: isOptionSet("objectsInArrays"),
        arraysInArraysException: isOptionSet("arraysInArrays"),
        arraysInObjectsException: isOptionSet("arraysInObjects"),
        objectsInObjectsException: isOptionSet("objectsInObjects"),
        propertyNameException: isOptionSet("propertyName")
    };

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determines whether two adjacent tokens are have whitespace between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is space between the tokens.
     */
    function isSpaced(left, right) {
        return left.range[1] < right.range[0];
    }

    /**
     * Determines whether two adjacent tokens are on the same line.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not the tokens are on the same line.
     */
    function isSameLine(left, right) {
        return left.loc.start.line === right.loc.start.line;
    }

    /**
    * Reports that there shouldn't be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoBeginningSpace(node, token) {
        context.report(node, token.loc.start,
            "There should be no space after '" + token.value + "'");
    }

    /**
    * Reports that there shouldn't be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoEndingSpace(node, token) {
        context.report(node, token.loc.start,
            "There should be no space before '" + token.value + "'");
    }

    /**
    * Reports that there should be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredBeginningSpace(node, token) {
        context.report(node, token.loc.start,
            "A space is required after '" + token.value + "'");
    }

    /**
    * Reports that there should be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredEndingSpace(node, token) {
        context.report(node, token.loc.start,
                    "A space is required before '" + token.value + "'");
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        MemberExpression: function(node) {
            if (!node.computed) {
                return;
            }

            var property = node.property,
                before = context.getTokenBefore(property),
                first = context.getFirstToken(property),
                last = context.getLastToken(property),
                after = context.getTokenAfter(property);

            var propertyNameMustBeSpaced = options.propertyNameException ?
                                    !options.spaced : options.spaced;

            if (isSameLine(before, first)) {
                if (propertyNameMustBeSpaced) {
                    if (!isSpaced(before, first) && isSameLine(before, first)) {
                        reportRequiredBeginningSpace(node, before);
                    }
                } else {
                    if (isSpaced(before, first)) {
                        reportNoBeginningSpace(node, before);
                    }
                }
            }

            if (isSameLine(last, after)) {
                if (propertyNameMustBeSpaced) {
                    if (!isSpaced(last, after) && isSameLine(last, after)) {
                        reportRequiredEndingSpace(node, after);
                    }
                } else {
                    if (isSpaced(last, after)) {
                        reportNoEndingSpace(node, after);
                    }
                }
            }
        },

        ArrayExpression: function(node) {
            if (node.elements.length === 0) {
                return;
            }

            var first = context.getFirstToken(node),
                second = context.getFirstToken(node, 1),
                penultimate = context.getLastToken(node, 1),
                last = context.getLastToken(node);

            var openingBracketMustBeSpaced =
                options.objectsInArraysException && second.value === "{" ||
                options.arraysInArraysException && second.value === "[" ||
                options.singleElementException && node.elements.length === 1
                ? !options.spaced : options.spaced;

            var closingBracketMustBeSpaced =
                options.objectsInArraysException && penultimate.value === "}" ||
                options.arraysInArraysException && penultimate.value === "]" ||
                options.singleElementException && node.elements.length === 1
                ? !options.spaced : options.spaced;

            if (isSameLine(first, second)) {
                if (openingBracketMustBeSpaced && !isSpaced(first, second)) {
                    reportRequiredBeginningSpace(node, first);
                }
                if (!openingBracketMustBeSpaced && isSpaced(first, second)) {
                    reportNoBeginningSpace(node, first);
                }
            }

            if (isSameLine(penultimate, last)) {
                if (closingBracketMustBeSpaced && !isSpaced(penultimate, last)) {
                    reportRequiredEndingSpace(node, last);
                }
                if (!closingBracketMustBeSpaced && isSpaced(penultimate, last)) {
                    reportNoEndingSpace(node, last);
                }
            }
        },

        ObjectExpression: function(node) {
            if (node.properties.length === 0) {
                return;
            }

            var first = context.getFirstToken(node),
                second = context.getFirstToken(node, 1),
                penultimate = context.getLastToken(node, 1),
                last = context.getLastToken(node);

            var closingCurlyBraceMustBeSpaced =
                options.arraysInObjectsException && penultimate.value === "]" ||
                options.objectsInObjectsException && penultimate.value === "}"
                ? !options.spaced : options.spaced;

            if (isSameLine(first, second)) {
                if (options.spaced && !isSpaced(first, second)) {
                    reportRequiredBeginningSpace(node, first);
                }
                if (!options.spaced && isSpaced(first, second)) {
                    reportNoBeginningSpace(node, first);
                }
            }

            if (isSameLine(penultimate, last)) {
                if (closingCurlyBraceMustBeSpaced && !isSpaced(penultimate, last)) {
                    reportRequiredEndingSpace(node, last);
                }
                if (!closingCurlyBraceMustBeSpaced && isSpaced(penultimate, last)) {
                    reportNoEndingSpace(node, last);
                }
            }
        }

    };

};

},{}],268:[function(require,module,exports){
/**
 * @fileoverview Disallows or enforces spaces inside of parentheses.
 * @author Jonathan Rajavuori
 * @copyright 2014 David Clark. All rights reserved.
 * @copyright 2014 Jonathan Rajavuori. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var MISSING_SPACE_MESSAGE = "There must be a space inside this paren.",
        REJECTED_SPACE_MESSAGE = "There should be no spaces inside this paren.",
        exceptionsArray = (context.options.length === 2) ? context.options[1].exceptions : [],
        options = {},
        rejectedSpaceRegExp,
        missingSpaceRegExp,
        spaceChecks;

    if (exceptionsArray && exceptionsArray.length) {
        options.braceException = exceptionsArray.indexOf("{}") !== -1 || false;
        options.bracketException = exceptionsArray.indexOf("[]") !== -1 || false;
        options.parenException = exceptionsArray.indexOf("()") !== -1 || false;
        options.empty = exceptionsArray.indexOf("empty") !== -1 || false;
    }

    /**
     * Used with the `never` option to produce, given the exception options,
     * two regular expressions to check for missing and rejected spaces.
     * @param {Object} opts The exception options
     * @returns {Object} `missingSpace` and `rejectedSpace` regular expressions
     * @private
     */
    function getNeverChecks(opts) {
        var missingSpaceOpeners = [],
            missingSpaceClosers = [],
            rejectedSpaceOpeners = [" ", "\\n", "\\r"],
            rejectedSpaceClosers = [" ", "\\n", "\\r"],
            missingSpaceCheck,
            rejectedSpaceCheck;

        // Populate openers and closers
        if (opts.braceException) {
            missingSpaceOpeners.push("\\{");
            missingSpaceClosers.push("\\}");
            rejectedSpaceOpeners.push("\\{");
            rejectedSpaceClosers.push("\\}");
        }
        if (opts.bracketException) {
            missingSpaceOpeners.push("\\[");
            missingSpaceClosers.push("\\]");
            rejectedSpaceOpeners.push("\\[");
            rejectedSpaceClosers.push("\\]");
        }
        if (opts.parenException) {
            missingSpaceOpeners.push("\\(");
            missingSpaceClosers.push("\\)");
            rejectedSpaceOpeners.push("\\(");
            rejectedSpaceClosers.push("\\)");
        }
        if (opts.empty) {
            missingSpaceOpeners.push("\\)");
            missingSpaceClosers.push("\\(");
            rejectedSpaceOpeners.push("\\)");
            rejectedSpaceClosers.push("\\(");
        }

        if (missingSpaceOpeners.length) {
            missingSpaceCheck = "\\((" + missingSpaceOpeners.join("|") + ")";
            if (missingSpaceClosers.length) {
                missingSpaceCheck += "|";
            }
        }
        if (missingSpaceClosers.length) {
            missingSpaceCheck += "(" + missingSpaceClosers.join("|") + ")\\)";
        }

        // compose the rejected regexp
        rejectedSpaceCheck = "\\( +[^" + rejectedSpaceOpeners.join("") + "]";
        rejectedSpaceCheck += "|[^" + rejectedSpaceClosers.join("") + "] +\\)";

        return {
            // e.g. \((\{)|(\})\) --- where {} is an exception
            missingSpace: missingSpaceCheck || ".^",
            // e.g. \( +[^ \n\r\{]|[^ \n\r\}] +\) --- where {} is an exception
            rejectedSpace: rejectedSpaceCheck
        };
    }

    /**
     * Used with the `always` option to produce, given the exception options,
     * two regular expressions to check for missing and rejected spaces.
     * @param {Object} opts The exception options
     * @returns {Object} `missingSpace` and `rejectedSpace` regular expressions
     * @private
     */
    function getAlwaysChecks(opts) {
        var missingSpaceOpeners = [" ", "\\)", "\\r", "\\n"],
            missingSpaceClosers = [" ", "\\(", "\\r", "\\n"],
            rejectedSpaceOpeners = [],
            rejectedSpaceClosers = [],
            missingSpaceCheck,
            rejectedSpaceCheck;

        // Populate openers and closers
        if (opts.braceException) {
            missingSpaceOpeners.push("\\{");
            missingSpaceClosers.push("\\}");
            rejectedSpaceOpeners.push(" \\{");
            rejectedSpaceClosers.push("\\} ");
        }
        if (opts.bracketException) {
            missingSpaceOpeners.push("\\[");
            missingSpaceClosers.push("\\]");
            rejectedSpaceOpeners.push(" \\[");
            rejectedSpaceClosers.push("\\] ");
        }
        if (opts.parenException) {
            missingSpaceOpeners.push("\\(");
            missingSpaceClosers.push("\\)");
            rejectedSpaceOpeners.push(" \\(");
            rejectedSpaceClosers.push("\\) ");
        }
        if (opts.empty) {
            rejectedSpaceOpeners.push(" \\)");
            rejectedSpaceClosers.push("\\( ");
        }

        // compose the allowed regexp
        missingSpaceCheck = "\\([^" + missingSpaceOpeners.join("") + "]";
        missingSpaceCheck += "|[^" + missingSpaceClosers.join("") + "]\\)";

        // compose the rejected regexp
        if (rejectedSpaceOpeners.length) {
            rejectedSpaceCheck = "\\((" + rejectedSpaceOpeners.join("|") + ")";
            if (rejectedSpaceClosers.length) {
                rejectedSpaceCheck += "|";
            }
        }
        if (rejectedSpaceClosers.length) {
            rejectedSpaceCheck += "(" + rejectedSpaceClosers.join("|") + ")\\)";
        }

        return {
            // e.g. \([^ \)\r\n\{]|[^ \(\r\n\}]\) --- where {} is an exception
            missingSpace: missingSpaceCheck,
            // e.g. \(( \{})|(\} )\) --- where {} is an excpetion
            rejectedSpace: rejectedSpaceCheck || ".^"
        };
    }

    spaceChecks = (context.options[0] === "always") ? getAlwaysChecks(options) : getNeverChecks(options);
    missingSpaceRegExp = new RegExp(spaceChecks.missingSpace, "mg");
    rejectedSpaceRegExp = new RegExp(spaceChecks.rejectedSpace, "mg");


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    var skipRanges = [];

    /**
     * Adds the range of a node to the set to be skipped when checking parens
     * @param {ASTNode} node The node to skip
     * @returns {void}
     * @private
     */
    function addSkipRange(node) {
        skipRanges.push(node.range);
    }

    /**
     * Sorts the skipRanges array. Must be called before shouldSkip
     * @returns {void}
     * @private
     */
    function sortSkipRanges() {
        skipRanges.sort(function (a, b) {
            return a[0] - b[0];
        });
    }

    /**
     * Checks if a certain position in the source should be skipped
     * @param {Number} pos The 0-based index in the source
     * @returns {boolean} whether the position should be skipped
     * @private
     */
    function shouldSkip(pos) {
        var i, len, range;
        for (i = 0, len = skipRanges.length; i < len; i += 1) {
            range = skipRanges[i];
            if (pos < range[0]) {
                break;
            } else if (pos < range[1]) {
                return true;
            }
        }
        return false;
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program:exit": function checkParenSpaces(node) {

            var nextMatch,
                nextLine,
                column,
                line = 1,
                source = context.getSource(),
                pos = 0;

            function checkMatch(match, message) {
                if (source.charAt(match.index) !== "(") {
                    // Matched a closing paren pattern
                    match.index += 1;
                }

                if (!shouldSkip(match.index)) {
                    while ((nextLine = source.indexOf("\n", pos)) !== -1 && nextLine < match.index) {
                        pos = nextLine + 1;
                        line += 1;
                    }
                    column = match.index - pos;

                    context.report(node, { line: line, column: column }, message);
                }
            }

            sortSkipRanges();

            while ((nextMatch = rejectedSpaceRegExp.exec(source)) !== null) {
                checkMatch(nextMatch, REJECTED_SPACE_MESSAGE);
            }

            while ((nextMatch = missingSpaceRegExp.exec(source)) !== null) {
                checkMatch(nextMatch, MISSING_SPACE_MESSAGE);
            }

        },


        // These nodes can contain parentheses that this rule doesn't care about

        LineComment: addSkipRange,

        BlockComment: addSkipRange,

        Literal: addSkipRange

    };

};

},{}],269:[function(require,module,exports){
/**
 * @fileoverview Require spaces around infix operators
 * @author Michael Ficarra
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var OPERATORS = [
        "*", "/", "%", "+", "-", "<<", ">>", ">>>", "<", "<=", ">", ">=", "in",
        "instanceof", "==", "!=", "===", "!==", "&", "^", "|", "&&", "||", "=",
        "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "^=", "|=",
        "?", ":", ","
    ];

    function isSpaced(left, right) {
        var op, tokens = context.getTokensBetween(left, right, 1);
        for (var i = 1, l = tokens.length - 1; i < l; ++i) {
            op = tokens[i];
            if (
                op.type === "Punctuator" &&
                OPERATORS.indexOf(op.value) >= 0 &&
                (tokens[i - 1].range[1] >= op.range[0] || op.range[1] >= tokens[i + 1].range[0])
            ) {
                return false;
            }
        }
        return true;
    }

    function report(node) {
        context.report(node, "Infix operators must be spaced.");
    }

    function checkBinary(node) {
        if (!isSpaced(node.left, node.right)) {
            report(node);
        }
    }

    function checkConditional(node) {
        if (!isSpaced(node.test, node.consequent) || !isSpaced(node.consequent, node.alternate)) {
            report(node);
        }
    }

    function checkVar(node) {
        if (node.init && !isSpaced(node.id, node.init)) {
            report(node);
        }
    }

    return {
        "AssignmentExpression": checkBinary,
        "BinaryExpression": checkBinary,
        "LogicalExpression": checkBinary,
        "ConditionalExpression": checkConditional,
        "VariableDeclarator": checkVar
    };

};

},{}],270:[function(require,module,exports){
/**
 * @fileoverview Require spaces following return, throw, and case
 * @author Michael Ficarra
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    function check(node) {
        var tokens = context.getFirstTokens(node, 2),
            value = tokens[0].value;

        if (tokens[0].range[1] >= tokens[1].range[0]) {
            context.report(node, "Keyword \"" + value + "\" must be followed by whitespace.");
        }
    }

    return {
        "ReturnStatement": function(node) {
            if (node.argument) {
                check(node);
            }
        },
        "SwitchCase": function(node) {
            if (node.test) {
                check(node);
            }
        },
        "ThrowStatement": check
    };

};

},{}],271:[function(require,module,exports){
/**
 * @fileoverview This rule shoud require or disallow spaces before or after unary operations.
 * @author Marcin Kumorek
 * @copyright 2014 Marcin Kumorek. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var options = context.options && Array.isArray(context.options) && context.options[0] || { words: true, nonwords: false };

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
    * Check if the parent unary operator is "!" in order to know if it's "!!" convert to Boolean or just "!" negation
    * @param {ASTnode} node AST node
    * @returns {boolean} Whether or not the parent is unary "!" operator
    */
    function isParentUnaryBangExpression(node) {
        return node && node.parent && node.parent.type === "UnaryExpression" && node.parent.operator === "!";
    }

    /**
    * Checks if the type is a unary word expression
    * @param {string} type value of AST token
    * @returns {boolean} Whether the word is in the list of known words
    */
    function isWordExpression(type) {
        return ["delete", "new", "typeof", "void"].indexOf(type) !== -1;
    }

    /**
    * Check if the node's child argument is an "ObjectExpression"
    * @param {ASTnode} node AST node
    * @returns {boolean} Whether or not the argument's type is "ObjectExpression"
    */
    function isArgumentObjectExpression(node) {
        return node.argument && node.argument.type && node.argument.type === "ObjectExpression";
    }

    /**
    * Check Unary Word Operators for spaces after the word operator
    * @param {ASTnode} node AST node
    * @param {object} firstToken first token from the AST node
    * @param {object} secondToken second token from the AST node
    * @returns {void}
    */
    function checkUnaryWordOperatorForSpaces(node, firstToken, secondToken) {
        if (options.words) {
            if (secondToken.range[0] === firstToken.range[1]) {
                context.report(node, "Unary word operator \"" + firstToken.value + "\" must be followed by whitespace.");
            }
        }

        if (!options.words && isArgumentObjectExpression(node)) {
            if (secondToken.range[0] > firstToken.range[1]) {
                context.report(node, "Unexpected space after unary word operator \"" + firstToken.value + "\".");
            }
        }
    }

    /**
    * Checks UnaryExpression, UpdateExpression and NewExpression for spaces before and after the operator
    * @param {ASTnode} node AST node
    * @returns {void}
    */
    function checkForSpaces(node) {
        var tokens = context.getFirstTokens(node, 2),
            firstToken = tokens[0],
            secondToken = tokens[1];

        if (isWordExpression(firstToken.value)) {
            checkUnaryWordOperatorForSpaces(node, firstToken, secondToken);
            return void 0;
        }

        if (options.nonwords) {
            if (node.prefix) {
                if (isParentUnaryBangExpression(node)) {
                    return void 0;
                }
                if (firstToken.range[1] === secondToken.range[0]) {
                    context.report(node, "Unary operator \"" + firstToken.value + "\" must be followed by whitespace.");
                }
            } else {
                if (firstToken.range[1] === secondToken.range[0]) {
                    context.report(node, "Space is required before unary expressions \"" + secondToken.value + "\".");
                }
            }
        } else {
            if (node.prefix) {
                if (secondToken.range[0] > firstToken.range[1]) {
                    context.report(node, "Unexpected space after unary operator \"" + firstToken.value + "\".");
                }
            } else {
                if (secondToken.range[0] > firstToken.range[1]) {
                    context.report(node, "Unexpected space before unary operator \"" + secondToken.value + "\".");
                }
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "UnaryExpression": checkForSpaces,
        "UpdateExpression": checkForSpaces,
        "NewExpression": checkForSpaces
    };

};

},{}],272:[function(require,module,exports){
/**
 * @fileoverview Enforces or disallows a space beginning a single-line comment.
 * @author Greg Cochard
 * @copyright 2014 Greg Cochard. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // Unless the first option is never, require a space
    var requireSpace = context.options[0] !== "never";

    // Default to match anything, so all will fail if there are no exceptions
    var exceptionMatcher = new RegExp(" ");

    // Grab the exceptions array and build a RegExp matcher for it
    var hasExceptions = context.options.length === 2;
    var unescapedExceptions = hasExceptions ? context.options[1].exceptions : [];
    var exceptions;

    if (unescapedExceptions.length) {
        exceptions = unescapedExceptions.map(function(s) {
            return s.replace(/([.*+?${}()|\^\[\]\/\\])/g, "\\$1");
        });
        exceptionMatcher = new RegExp("(^(" + exceptions.join(")+$)|(^(") + ")+$)");
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "LineComment": function checkCommentForSpace(node) {

            if (requireSpace) {

                // If length is zero, ignore it
                if (node.value.length === 0) {
                    return;
                }

                // Space expected and not found
                if (node.value.indexOf(" ") !== 0 && node.value.indexOf("\t") !== 0) {

                    /*
                     * Do two tests; one for space starting the line,
                     * and one for a comment comprised only of exceptions
                     */
                    if (hasExceptions && !exceptionMatcher.test(node.value)) {
                        context.report(node, "Expected exception block, space or tab after // in comment.");
                    } else if (!hasExceptions) {
                        context.report(node, "Expected space or tab after // in comment.");
                    }
                }

            } else {

                if (node.value.indexOf(" ") === 0 || node.value.indexOf("\t") === 0) {
                    context.report(node, "Unexpected space or tab after // in comment.");
                }
            }
        }

    };
};

},{}],273:[function(require,module,exports){
/**
 * @fileoverview Rule to control usage of strict mode directives.
 * @author Brandon Mills
 * @copyright 2015 Brandon Mills. All rights reserved.
 * @copyright 2013-2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2013 Ian Christian Myers. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var messages = {
    function: "Use the function form of \"use strict\".",
    global: "Use the global form of \"use strict\".",
    multiple: "Multiple \"use strict\" directives.",
    never: "Strict mode is not permitted.",
    unnecessary: "Unnecessary \"use strict\" directive."
};

/**
 * Gets all of the Use Strict Directives in the Directive Prologue of a group of
 * statements.
 * @param {ASTNode[]} statements Statements in the program or function body.
 * @returns {ASTNode[]} All of the Use Strict Directives.
 */
function getUseStrictDirectives(statements) {
    var directives = [],
        i, statement;

    for (i = 0; i < statements.length; i++) {
        statement = statements[i];

        if (
            statement.type === "ExpressionStatement" &&
            statement.expression.type === "Literal" &&
            statement.expression.value === "use strict"
        ) {
            directives[i] = statement;
        } else {
            break;
        }
    }

    return directives;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var mode = context.options[0],
        isModule = context.ecmaFeatures.modules,
        modes = {},
        scopes = [];

    /**
     * Report a node or array of nodes with a given message.
     * @param {(ASTNode|ASTNode[])} nodes Node or nodes to report.
     * @param {string} message Message to display.
     * @returns {void}
     */
    function report(nodes, message) {
        var i;

        if (Array.isArray(nodes)) {
            for (i = 0; i < nodes.length; i++) {
                context.report(nodes[i], message);
            }
        } else {
            context.report(nodes, message);
        }
    }

    //--------------------------------------------------------------------------
    // "deprecated" mode (default)
    //--------------------------------------------------------------------------

    /**
     * Determines if a given node is "use strict".
     * @param {ASTNode} node The node to check.
     * @returns {boolean} True if the node is a strict pragma, false if not.
     * @void
     */
    function isStrictPragma(node) {
        return (node && node.type === "ExpressionStatement" &&
                node.expression.value === "use strict");
    }

    /**
     * When you enter a scope, push the strict value from the previous scope
     * onto the stack.
     * @param {ASTNode} node The AST node being checked.
     * @returns {void}
     * @private
     */
    function enterScope(node) {

        var isStrict = false,
            isProgram = (node.type === "Program"),
            isParentGlobal = scopes.length === 1,
            isParentStrict = scopes.length ? scopes[scopes.length - 1] : false;

        // look for the "use strict" pragma
        if (isModule) {
            isStrict = true;
        } else if (isProgram) {
            isStrict = isStrictPragma(node.body[0]) || isParentStrict;
        } else {
            isStrict = node.body.body && isStrictPragma(node.body.body[0]) || isParentStrict;
        }

        scopes.push(isStrict);

        // never warn if the parent is strict or the function is strict
        if (!isParentStrict && !isStrict && isParentGlobal) {
            context.report(node, "Missing \"use strict\" statement.");
        }
    }

    /**
     * When you exit a scope, pop off the top scope and see if it's true or
     * false.
     * @returns {void}
     * @private
     */
    function exitScope() {
        scopes.pop();
    }

    modes.deprecated = {
        "Program": enterScope,
        "FunctionDeclaration": enterScope,
        "FunctionExpression": enterScope,
        "ArrowFunctionExpression": enterScope,

        "Program:exit": exitScope,
        "FunctionDeclaration:exit": exitScope,
        "FunctionExpression:exit": exitScope,
        "ArrowFunctionExpression:exit": exitScope
    };

    //--------------------------------------------------------------------------
    // "never" mode
    //--------------------------------------------------------------------------

    modes.never = {
        "Program": function(node) {
            report(getUseStrictDirectives(node.body), messages.never);
        },
        "FunctionDeclaration": function(node) {
            report(getUseStrictDirectives(node.body.body), messages.never);
        },
        "FunctionExpression": function(node) {
            report(getUseStrictDirectives(node.body.body), messages.never);
        }
    };

    //--------------------------------------------------------------------------
    // "global" mode
    //--------------------------------------------------------------------------

    modes.global = {
        "Program": function(node) {
            var useStrictDirectives = getUseStrictDirectives(node.body);

            if (!isModule && node.body.length && useStrictDirectives.length < 1) {
                report(node, messages.global);
            } else if (isModule) {
                report(useStrictDirectives, messages.unnecessary);
            } else {
                report(useStrictDirectives.slice(1), messages.multiple);
            }
        },
        "FunctionDeclaration": function(node) {
            report(getUseStrictDirectives(node.body.body), messages.global);
        },
        "FunctionExpression": function(node) {
            report(getUseStrictDirectives(node.body.body), messages.global);
        }
    };

    //--------------------------------------------------------------------------
    // "function" mode
    //--------------------------------------------------------------------------

    /**
     * Entering a function pushes a new nested scope onto the stack. The new
     * scope is true if the nested function is strict mode code.
     * @param {ASTNode} node The function declaration or expression.
     * @returns {void}
     */
    function enterFunction(node) {
        var useStrictDirectives = getUseStrictDirectives(node.body.body),
            isParentGlobal = scopes.length === 0,
            isParentStrict = isModule || (scopes.length && scopes[scopes.length - 1]),
            isStrict = useStrictDirectives.length > 0 || isModule;

        if (isStrict) {
            if (isParentStrict && useStrictDirectives.length) {
                report(useStrictDirectives[0], messages.unnecessary);
            }

            report(useStrictDirectives.slice(1), messages.multiple);
        } else if (isParentGlobal && !isModule) {
            report(node, messages.function);
        }

        scopes.push(isParentStrict || isStrict);
    }

    /**
     * Exiting a function pops its scope off the stack.
     * @returns {void}
     */
    function exitFunction() {
        scopes.pop();
    }

    modes.function = {
        "Program": function(node) {
            report(getUseStrictDirectives(node.body), messages.function);
        },
        "FunctionDeclaration": enterFunction,
        "FunctionExpression": enterFunction,
        "FunctionDeclaration:exit": exitFunction,
        "FunctionExpression:exit": exitFunction
    };

    return modes[mode || "deprecated"];

};

},{}],274:[function(require,module,exports){
/**
 * @fileoverview Rule to flag comparisons to the value NaN
 * @author James Allardice
 * @copyright 2014 Jordan Harband. All rights reserved.
 * @copyright 2013 James Allardice. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    return {
        "BinaryExpression": function (node) {
            if (/^(?:[<>]|[!=]=)=?$/.test(node.operator) && (node.left.name === "NaN" || node.right.name === "NaN")) {
                context.report(node, "Use the isNaN function to compare with NaN.");
            }
        }
    };

};

},{}],275:[function(require,module,exports){
/**
 * @fileoverview Validates JSDoc comments are syntactically correct
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var doctrine = require("doctrine");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var options = context.options[0] || {},
        prefer = options.prefer || {},

        // these both default to true, so you have to explicitly make them false
        requireReturn = options.requireReturn === false ? false : true,
        requireParamDescription = options.requireParamDescription !== false,
        requireReturnDescription = options.requireReturnDescription !== false;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // Using a stack to store if a function returns or not (handling nested functions)
    var fns = [];

    /**
     * When parsing a new function, store it in our function stack.
     * @returns {void}
     * @private
     */
    function startFunction() {
        fns.push({returnPresent: false});
    }

    /**
     * Indicate that return has been found in the current function.
     * @param {ASTNode} node The return node.
     * @returns {void}
     * @private
     */
    function addReturn(node) {
        var functionState = fns[fns.length - 1];

        if (functionState && node.argument !== null) {
            functionState.returnPresent = true;
        }
    }

    /**
     * Validate the JSDoc node and output warnings if anything is wrong.
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     * @private
     */
    function checkJSDoc(node) {
        var jsdocNode = context.getJSDocComment(node),
            functionData = fns.pop(),
            hasReturns = false,
            hasConstructor = false,
            params = Object.create(null),
            jsdoc;

        // make sure only to validate JSDoc comments
        if (jsdocNode) {

            try {
                jsdoc = doctrine.parse(jsdocNode.value, {
                    strict: true,
                    unwrap: true,
                    sloppy: true
                });
            } catch (ex) {

                if (/braces/i.test(ex.message)) {
                    context.report(jsdocNode, "JSDoc type missing brace.");
                } else {
                    context.report(jsdocNode, "JSDoc syntax error.");
                }

                return;
            }

            jsdoc.tags.forEach(function(tag) {

                switch (tag.title) {

                    case "param":
                        if (!tag.type) {
                            context.report(jsdocNode, "Missing JSDoc parameter type for '{{name}}'.", { name: tag.name });
                        }

                        if (!tag.description && requireParamDescription) {
                            context.report(jsdocNode, "Missing JSDoc parameter description for '{{name}}'.", { name: tag.name });
                        }

                        if (params[tag.name]) {
                            context.report(jsdocNode, "Duplicate JSDoc parameter '{{name}}'.", { name: tag.name });
                        } else if (tag.name.indexOf(".") === -1) {
                            params[tag.name] = 1;
                        }
                        break;

                    case "return":
                    case "returns":
                        hasReturns = true;

                        if (!requireReturn && !functionData.returnPresent && tag.type.name !== "void" && tag.type.name !== "undefined") {
                            context.report(jsdocNode, "Unexpected @" + tag.title + " tag; function has no return statement.");
                        } else {
                            if (!tag.type) {
                                context.report(jsdocNode, "Missing JSDoc return type.");
                            }

                            if (tag.type.name !== "void" && !tag.description && requireReturnDescription) {
                                context.report(jsdocNode, "Missing JSDoc return description.");
                            }
                        }

                        break;

                    case "constructor":
                    case "class":
                        hasConstructor = true;
                        break;

                    // no default
                }

                // check tag preferences
                if (prefer.hasOwnProperty(tag.title)) {
                    context.report(jsdocNode, "Use @{{name}} instead.", { name: prefer[tag.title] });
                }

            });

            // check for functions missing @returns
            if (!hasReturns && !hasConstructor) {
                if (requireReturn || functionData.returnPresent) {
                    context.report(jsdocNode, "Missing JSDoc @returns for function.");
                }
            }

            // check the parameters
            var jsdocParams = Object.keys(params);

            node.params.forEach(function(param, i) {
                var name = param.name;

                if (jsdocParams[i] && (name !== jsdocParams[i])) {
                    context.report(jsdocNode, "Expected JSDoc for '{{name}}' but found '{{jsdocName}}'.", {
                        name: name,
                        jsdocName: jsdocParams[i]
                    });
                } else if (!params[name]) {
                    context.report(jsdocNode, "Missing JSDoc for parameter '{{name}}'.", {
                        name: name
                    });
                }
            });

        }

    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "ArrowFunctionExpression": startFunction,
        "FunctionExpression": startFunction,
        "FunctionDeclaration": startFunction,
        "ArrowFunctionExpression:exit": checkJSDoc,
        "FunctionExpression:exit": checkJSDoc,
        "FunctionDeclaration:exit": checkJSDoc,
        "ReturnStatement": addReturn
    };

};

},{"doctrine":8}],276:[function(require,module,exports){
/**
 * @fileoverview Ensures that the results of typeof are compared against a valid string
 * @author Ian Christian Myers
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var VALID_TYPES = ["symbol", "undefined", "object", "boolean", "number", "string", "function"],
        OPERATORS = ["==", "===", "!=", "!=="];

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "UnaryExpression": function (node) {
            var parent, sibling;

            if (node.operator === "typeof") {
                parent = context.getAncestors().pop();

                if (parent.type === "BinaryExpression" && OPERATORS.indexOf(parent.operator) !== -1) {
                    sibling = parent.left === node ? parent.right : parent.left;

                    if (sibling.type === "Literal" && VALID_TYPES.indexOf(sibling.value) === -1) {
                        context.report(sibling, "Invalid typeof comparison value");
                    }
                }
            }
        }

    };

};

},{}],277:[function(require,module,exports){
/**
 * @fileoverview Rule to enforce var declarations are only at the top of a function.
 * @author Danny Fritz
 * @author Gyandeep Singh
 * @copyright 2014 Danny Fritz. All rights reserved.
 * @copyright 2014 Gyandeep Singh. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var errorMessage = "All \"var\" declarations must be at the top of the function scope.";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * @param {ASTNode} node - any node
     * @returns {Boolean} whether the given node structurally represents a directive
     */
    function looksLikeDirective(node) {
        return node.type === "ExpressionStatement" &&
            node.expression.type === "Literal" && typeof node.expression.value === "string";
    }

    /**
     * Checks whether this variable is on top of the block body
     * @param {ASTNode} node - The node to check
     * @param {ASTNode[]} statements - collection of ASTNodes for the parent node block
     * @returns {Boolean} True if var is on top otherwise false
     */
    function isVarOnTop(node, statements) {
        var i = 0, l = statements.length;

        // skip over directives
        for (; i < l; ++i) {
            if (!looksLikeDirective(statements[i])) {
                break;
            }
        }

        for (; i < l; ++i) {
            if (statements[i].type !== "VariableDeclaration") {
                return false;
            }
            if (statements[i] === node) {
                return true;
            }
        }
    }

    /**
     * Checks whether variable is on top at the global level
     * @param {ASTNode} node - The node to check
     * @param {ASTNode} parent - Parent of the node
     * @returns {void}
     */
    function globalVarCheck(node, parent) {
        if (!isVarOnTop(node, parent.body)) {
            context.report(node, errorMessage);
        }
    }

    /**
     * Checks whether variable is on top at functional block scope level
     * @param {ASTNode} node - The node to check
     * @param {ASTNode} parent - Parent of the node
     * @param {ASTNode} grandParent - Parent of the node's parent
     * @returns {void}
     */
    function blockScopeVarCheck(node, parent, grandParent) {
        if (!(/Function/.test(grandParent.type) &&
                parent.type === "BlockStatement" &&
                isVarOnTop(node, parent.body))) {
            context.report(node, errorMessage);
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "VariableDeclaration": function (node) {
            var ancestors = context.getAncestors();
            var parent = ancestors.pop();
            var grandParent = ancestors.pop();

            if (node.kind === "var") {// check variable is `var` type and not `let` or `const`
                if (parent.type === "Program") {// That means its a global variable
                    globalVarCheck(node, parent);
                } else {
                    blockScopeVarCheck(node, parent, grandParent);
                }
            }
        }
    };

};

},{}],278:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when IIFE is not wrapped in parens
 * @author Ilya Volodin
 * @copyright 2013 Ilya Volodin. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var style = context.options[0] || "outside";

    function wrapped(node) {
        var previousToken = context.getTokenBefore(node),
            nextToken = context.getTokenAfter(node);
        return previousToken && previousToken.value === "(" &&
            nextToken && nextToken.value === ")";
    }

    return {

        "CallExpression": function(node) {
            if (node.callee.type === "FunctionExpression") {
                var callExpressionWrapped = wrapped(node),
                    functionExpressionWrapped = wrapped(node.callee);

                if (!callExpressionWrapped && !functionExpressionWrapped) {
                    context.report(node, "Wrap an immediate function invocation in parentheses.");
                } else if (style === "inside" && !functionExpressionWrapped) {
                    context.report(node, "Wrap only the function expression in parens.");
                } else if (style === "outside" && !callExpressionWrapped) {
                    context.report(node, "Move the invocation into the parens that contain the function.");
                }
            }
        }
    };

};

},{}],279:[function(require,module,exports){
/**
 * @fileoverview Rule to flag when regex literals are not wrapped in parens
 * @author Matt DuVall <http://www.mattduvall.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    return {

        "Literal": function(node) {
            var token = context.getFirstToken(node),
                nodeType = token.type,
                source,
                grandparent,
                ancestors;

            if (nodeType === "RegularExpression") {
                source = context.getTokenBefore(node);
                ancestors = context.getAncestors();
                grandparent = ancestors[ancestors.length - 1];

                if (grandparent.type === "MemberExpression" && grandparent.object === node &&
                    (!source || source.value !== "(")) {
                    context.report(node, "Wrap the regexp literal in parens to disambiguate the slash.");
                }
            }
        }
    };

};

},{}],280:[function(require,module,exports){
/**
 * @fileoverview Rule to require or disallow yoda comparisons
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2014 Brandon Mills. All rights reserved.
 */
"use strict";

//--------------------------------------------------------------------------
// Helpers
//--------------------------------------------------------------------------

/**
 * Determines whether an operator is a comparison operator.
 * @param {String} operator The operator to check.
 * @returns {boolean} Whether or not it is a comparison operator.
 */
function isComparisonOperator(operator) {
    return (/^(==|===|!=|!==|<|>|<=|>=)$/).test(operator);
}

/**
 * Determines whether an operator is one used in a range test.
 * Allowed operators are `<` and `<=`.
 * @param {String} operator The operator to check.
 * @returns {boolean} Whether the operator is used in range tests.
 */
function isRangeTestOperator(operator) {
    return ["<", "<="].indexOf(operator) >= 0;
}

/**
 * Determines whether a non-Literal node is a negative number that should be
 * treated as if it were a single Literal node.
 * @param {ASTNode} node Node to test.
 * @returns {boolean} True if the node is a negative number that looks like a
 *                    real literal and should be treated as such.
 */
function looksLikeLiteral(node) {
    return (node.type === "UnaryExpression" &&
        node.operator === "-" &&
        node.prefix &&
        node.argument.type === "Literal" &&
        typeof node.argument.value === "number");
}

/**
 * Attempts to derive a Literal node from nodes that are treated like literals.
 * @param {ASTNode} node Node to normalize.
 * @returns {ASTNode} The original node if the node is already a Literal, or a
 *                    normalized Literal node with the negative number as the
 *                    value if the node represents a negative number literal,
 *                    otherwise null if the node cannot be converted to a
 *                    normalized literal.
 */
function getNormalizedLiteral(node) {
    if (node.type === "Literal") {
        return node;
    }

    if (looksLikeLiteral(node)) {
        return {
            type: "Literal",
            value: -node.argument.value,
            raw: "-" + node.argument.value
        };
    }

    return null;
}

/**
 * Checks whether two expressions reference the same value. For example:
 *     a = a
 *     a.b = a.b
 *     a[0] = a[0]
 *     a['b'] = a['b']
 * @param   {ASTNode} a Left side of the comparison.
 * @param   {ASTNode} b Right side of the comparison.
 * @returns {boolean}   True if both sides match and reference the same value.
 */
function same(a, b) {
    if (a.type !== b.type) {
        return false;
    }

    switch (a.type) {
        case "Identifier":
            return a.name === b.name;
        case "Literal":
            return a.value === b.value;
        case "MemberExpression":
            // x[0] = x[0]
            // x[y] = x[y]
            // x.y = x.y
            return same(a.object, b.object) && same(a.property, b.property);
        default:
            return false;
    }
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    // Default to "never" (!always) if no option
    var always = (context.options[0] === "always");
    var exceptRange = (context.options[1] && context.options[1].exceptRange);

    /**
     * Determines whether node represents a range test.
     * A range test is a "between" test like `(0 <= x && x < 1)` or an "outside"
     * test like `(x < 0 || 1 <= x)`. It must be wrapped in parentheses, and
     * both operators must be `<` or `<=`. Finally, the literal on the left side
     * must be less than or equal to the literal on the right side so that the
     * test makes any sense.
     * @param {ASTNode} node LogicalExpression node to test.
     * @returns {Boolean} Whether node is a range test.
     */
    function isRangeTest(node) {
        var left = node.left,
            right = node.right;

        /**
         * Determines whether node is of the form `0 <= x && x < 1`.
         * @returns {Boolean} Whether node is a "between" range test.
         */
        function isBetweenTest() {
            var leftLiteral, rightLiteral;

            return (node.operator === "&&" &&
                (leftLiteral = getNormalizedLiteral(left.left)) &&
                (rightLiteral = getNormalizedLiteral(right.right)) &&
                leftLiteral.value <= rightLiteral.value &&
                same(left.right, right.left));
        }

        /**
         * Determines whether node is of the form `x < 0 || 1 <= x`.
         * @returns {Boolean} Whether node is an "outside" range test.
         */
        function isOutsideTest() {
            var leftLiteral, rightLiteral;

            return (node.operator === "||" &&
                (leftLiteral = getNormalizedLiteral(left.right)) &&
                (rightLiteral = getNormalizedLiteral(right.left)) &&
                leftLiteral.value <= rightLiteral.value &&
                same(left.left, right.right));
        }

        /**
         * Determines whether node is wrapped in parentheses.
         * @returns {Boolean} Whether node is preceded immediately by an open
         *                    paren token and followed immediately by a close
         *                    paren token.
         */
        function isParenWrapped() {
            var tokenBefore, tokenAfter;

            return ((tokenBefore = context.getTokenBefore(node)) &&
                tokenBefore.value === "(" &&
                (tokenAfter = context.getTokenAfter(node)) &&
                tokenAfter.value === ")");
        }

        return (node.type === "LogicalExpression" &&
            left.type === "BinaryExpression" &&
            right.type === "BinaryExpression" &&
            isRangeTestOperator(left.operator) &&
            isRangeTestOperator(right.operator) &&
            (isBetweenTest() || isOutsideTest()) &&
            isParenWrapped());
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "BinaryExpression": always ? function(node) {

            // Comparisons must always be yoda-style: if ("blue" === color)
            if (
                (node.right.type === "Literal" || looksLikeLiteral(node.right)) &&
                isComparisonOperator(node.operator) &&
                !(exceptRange && isRangeTest(context.getAncestors().pop()))
            ) {
                context.report(node, "Expected literal to be on the left side of " + node.operator + ".");
            }

        } : function(node) {

            // Comparisons must never be yoda-style (default)
            if (
                (node.left.type === "Literal" || looksLikeLiteral(node.left)) &&
                isComparisonOperator(node.operator) &&
                !(exceptRange && isRangeTest(context.getAncestors().pop()))
            ) {
                context.report(node, "Expected literal to be on the right side of " + node.operator + ".");
            }

        }
    };

};

},{}],281:[function(require,module,exports){
(function (process){
/**
 * @fileoverview Tracks performance of individual rules.
 * @author Brandon Mills
 * @copyright 2014 Brandon Mills. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/* istanbul ignore next */
function alignLeft(str, len, ch) {
    return str + new Array(len - str.length + 1).join(ch || " ");
}

/* istanbul ignore next */
function alignRight(str, len, ch) {
    return new Array(len - str.length + 1).join(ch || " ") + str;
}

//------------------------------------------------------------------------------
// Module definition
//------------------------------------------------------------------------------

var enabled = !!process.env.TIMING;

var HEADERS = ["Rule", "Time (ms)", "Relative"];
var ALIGN = [alignLeft, alignRight, alignRight];

/* istanbul ignore next */
function display(data) {
    var total = 0;
    var rows = Object.keys(data)
        .map(function(key) {
            var time = data[key];
            total += time;
            return [key, time];
        })
        .sort(function(a, b) {
            return b[1] - a[1];
        })
        .slice(0, 10);

    rows.forEach(function(row) {
        row.push((row[1] * 100 / total).toFixed(1) + "%");
        row[1] = row[1].toFixed(3);
    });

    rows.unshift(HEADERS);

    var widths = [];
    rows.forEach(function(row) {
        var len = row.length, i, n;
        for (i = 0; i < len; i++) {
            n = row[i].length;
            if (!widths[i] || n > widths[i]) {
                widths[i] = n;
            }
        }
    });

    var table = rows.map(function(row) {
        return row.map(function(cell, index) {
            return ALIGN[index](cell, widths[index]);
        }).join(" | ");
    });
    table.splice(1, 0, widths.map(function(w, index) {
        if (index !== 0 && index !== widths.length - 1) {
            w++;
        }

        return ALIGN[index](":", w + 1, "-");
    }).join("|"));

    console.log(table.join("\n"));
}

/* istanbul ignore next */
module.exports = (function() {

    var data = Object.create(null);

    function time(key, fn) {
        if (typeof data[key] === "undefined") {
            data[key] = 0;
        }

        return function() {
            var t = process.hrtime();
            fn.apply(null, Array.prototype.slice.call(arguments));
            t = process.hrtime(t);
            data[key] += t[0] * 1e3 + t[1] / 1e6;
        };
    }

    if (enabled) {
        process.on("exit", function() {
            display(data);
        });
    }

    return {
        time: time,
        enabled: enabled
    };

}());

}).call(this,require('_process'))
},{"_process":5}],282:[function(require,module,exports){
/**
 * @fileoverview Object to handle access and retrieval of tokens.
 * @author Brandon Mills
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2014 Brandon Mills. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Implementation
//------------------------------------------------------------------------------

module.exports = function(tokens) {
    var api = {},
        starts = Object.create(null),
        ends = Object.create(null),
        index, length, range;

    /**
     * Gets tokens in a given interval.
     * @param {int} start Inclusive index of the first token. 0 if negative.
     * @param {int} end Exclusive index of the last token.
     * @returns {Token[]} Tokens in the interval.
     */
    function get(start, end) {
        var result = [],
            i;

        for (i = Math.max(0, start); i < end && i < length; i++) {
            result.push(tokens[i]);
        }

        return result;
    }

    /**
     * Gets the index in the tokens array of the last token belonging to a node.
     * Usually a node ends exactly at a token, but due to ASI, sometimes a
     * node's range extends beyond its last token.
     * @param {ASTNode} node The node for which to find the last token's index.
     * @returns {int} Index in the tokens array of the node's last token.
     */
    function lastTokenIndex(node) {
        var end = node.range[1],
            cursor = ends[end];

        // If the node extends beyond its last token, get the token before the
        // next token
        if (typeof cursor === "undefined") {
            cursor = starts[end] - 1;
        }

        // If there isn't a next token, the desired token is the last one in the
        // array
        if (isNaN(cursor)) {
            cursor = length - 1;
        }

        return cursor;
    }

    // Map tokens' start and end range to the index in the tokens array
    for (index = 0, length = tokens.length; index < length; index++) {
        range = tokens[index].range;
        starts[range[0]] = index;
        ends[range[1]] = index;
    }

    /**
     * Gets a number of tokens that precede a given node or token in the token
     * stream.
     * @param {(ASTNode|Token)} node The AST node or token.
     * @param {int} [beforeCount=0] The number of tokens before the node or
     *     token to retrieve.
     * @returns {Token[]} Array of objects representing tokens.
     */
    api.getTokensBefore = function(node, beforeCount) {
        var first = starts[node.range[0]];
        return get(first - (beforeCount || 0), first);
    };

    /**
     * Gets the token that precedes a given node or token in the token stream.
     * @param {(ASTNode|Token)} node The AST node or token.
     * @param {int} [skip=0] A number of tokens to skip before the given node or
     *     token.
     * @returns {Token} An object representing the token.
     */
    api.getTokenBefore = function(node, skip) {
        return tokens[starts[node.range[0]] - (skip || 0) - 1];
    };

    /**
     * Gets a number of tokens that follow a given node or token in the token
     * stream.
     * @param {(ASTNode|Token)} node The AST node or token.
     * @param {int} [afterCount=0] The number of tokens after the node or token
     *     to retrieve.
     * @returns {Token[]} Array of objects representing tokens.
     */
    api.getTokensAfter = function(node, afterCount) {
        var start = lastTokenIndex(node) + 1;
        return get(start, start + (afterCount || 0));
    };

    /**
     * Gets the token that follows a given node or token in the token stream.
     * @param {(ASTNode|Token)} node The AST node or token.
     * @param {int} [skip=0] A number of tokens to skip after the given node or
     *     token.
     * @returns {Token} An object representing the token.
     */
    api.getTokenAfter = function(node, skip) {
        return tokens[lastTokenIndex(node) + (skip || 0) + 1];
    };

    /**
     * Gets all tokens that are related to the given node.
     * @param {ASTNode} node The AST node.
     * @param {int} [beforeCount=0] The number of tokens before the node to retrieve.
     * @param {int} [afterCount=0] The number of tokens after the node to retrieve.
     * @returns {Token[]} Array of objects representing tokens.
     */
    api.getTokens = function(node, beforeCount, afterCount) {
        return get(
            starts[node.range[0]] - (beforeCount || 0),
            lastTokenIndex(node) + (afterCount || 0) + 1
        );
    };

    /**
     * Gets the first `count` tokens of the given node's token stream.
     * @param {ASTNode} node The AST node.
     * @param {int} [count=0] The number of tokens of the node to retrieve.
     * @returns {Token[]} Array of objects representing tokens.
     */
    api.getFirstTokens = function(node, count) {
        var first = starts[node.range[0]];
        return get(
            first,
            Math.min(lastTokenIndex(node) + 1, first + (count || 0))
        );
    };

    /**
     * Gets the first token of the given node's token stream.
     * @param {ASTNode} node The AST node.
     * @param {int} [skip=0] A number of tokens to skip.
     * @returns {Token} An object representing the token.
     */
    api.getFirstToken = function(node, skip) {
        return tokens[starts[node.range[0]] + (skip || 0)];
    };

    /**
     * Gets the last `count` tokens of the given node.
     * @param {ASTNode} node The AST node.
     * @param {int} [count=0] The number of tokens of the node to retrieve.
     * @returns {Token[]} Array of objects representing tokens.
     */
    api.getLastTokens = function(node, count) {
        var last = lastTokenIndex(node) + 1;
        return get(Math.max(starts[node.range[0]], last - (count || 0)), last);
    };

    /**
     * Gets the last token of the given node's token stream.
     * @param {ASTNode} node The AST node.
     * @param {int} [skip=0] A number of tokens to skip.
     * @returns {Token} An object representing the token.
     */
    api.getLastToken = function(node, skip) {
        return tokens[lastTokenIndex(node) - (skip || 0)];
    };

    /**
     * Gets all of the tokens between two non-overlapping nodes.
     * @param {ASTNode} left Node before the desired token range.
     * @param {ASTNode} right Node after the desired token range.
     * @param {int} [padding=0] Number of extra tokens on either side of center.
     * @returns {Token[]} Tokens between left and right plus padding.
     */
    api.getTokensBetween = function(left, right, padding) {
        padding = padding || 0;
        return get(
            lastTokenIndex(left) + 1 - padding,
            starts[right.range[0]] + padding
        );
    };

    /**
     * Gets the token starting at the specified index.
     * @param {int} startIndex Index of the start of the token's range.
     * @returns {Token} The token starting at index, or null if no such token.
     */
    api.getTokenByRangeStart = function(startIndex) {
        return (tokens[starts[startIndex]] || null);
    };

    return api;
};

},{}],283:[function(require,module,exports){
/**
 * @fileoverview Common utilities.
 */
"use strict";

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var PLUGIN_NAME_PREFIX = "eslint-plugin-";

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------
/**
 * Merges two objects together and assigns the result to the initial object. Can be used for shallow cloning.
 * @param {Object} target of the cloning operation
 * @param {Object} source object
 * @returns {void}
 */
exports.mixin = function(target, source) {
    Object.keys(source).forEach(function(key) {
        target[key] = source[key];
    });
};

/**
 * Merges two config objects. This will not only add missing keys, but will also modify values to match.
 * @param {Object} base config object
 * @param {Object} custom config object. Overrides in this config object will take priority over base.
 * @returns {Object} merged config object.
 */
exports.mergeConfigs = function mergeConfigs(base, custom) {

    Object.keys(custom).forEach(function (key) {
        var property = custom[key];

        if (key === "plugins") {
            if (!base[key]) {
                base[key] = [];
            }

            property.forEach(function (plugin) {
                // skip duplicates
                if (base[key].indexOf(plugin) === -1) {
                    base[key].push(plugin);
                }
            });
            return;
        }

        if (Array.isArray(base[key]) && !Array.isArray(property) && typeof property === "number") {
            // assume that we are just overriding first attribute
            base[key][0] = custom[key];
            return;
        }

        if (typeof property === "object" && !Array.isArray(property) && property !== null) {
            // base[key] might not exist, so be careful with recursion here
            base[key] = mergeConfigs(base[key] || {}, custom[key]);
        } else {
            base[key] = custom[key];
        }
    });

    return base;
};

/**
 * Removes the prefix `eslint-plugin-` from a plugin name.
 * @param {string} pluginName The name of the plugin which may have the prefix.
 * @returns {string} The name of the plugin without prefix.
 */
exports.removePluginPrefix = function removePluginPrefix(pluginName) {
    return pluginName.indexOf(PLUGIN_NAME_PREFIX) === 0 ? pluginName.substring(PLUGIN_NAME_PREFIX.length) : pluginName;
};

exports.PLUGIN_NAME_PREFIX = PLUGIN_NAME_PREFIX;

},{}]},{},[128])(128)
});