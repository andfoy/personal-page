// Code goes here

$(document).ready(function() {

    $("#expr").keydown(function() {
        get_result(this.value);
    });
    $("#expr").keyup(function() {
        get_result(this.value);
    });

});

function get_result(expr_s)
{
    console.log(expr_s);
    $("#result").val("");
    var expr_node = {expr:expr_s};
    try
    {
        parse_expr(expr_node);
        //console.log(expr_node);
        var result = eval_tree(expr_node);
        if(typeof result == 'string')
        {
            
            failure();
        }
        else
        {
        console.log(result);
        correct();
        }
        $("#result").val(result);
    }
    catch(e)
    {
        $("#result").val("Syntax Error!");
        failure();
    }
}

function eval_tree(tree)
{
    if(tree.hasOwnProperty('root'))
    {
        return tree['root'];
    }
    var a;
    var b;
    if(typeof tree.left == 'object')
    {
        a = eval_tree(tree.left);
    }
    if(typeof tree.right == 'object')
    {
        b = eval_tree(tree.right);
    }
    if(tree.op == '/')
    {
        console.log(b);
        if(b === 0)
        {
            return "Division by zero!"
        }
    }
    return tree.operation(a, b);

}

function parse_expr(expr_node) {
    var num_expr = /^\s*\d+([.]\d+)?\s*$/;
    var paren_expr = /^\s*[(]\s*(\d|[.]|[(]|[)]|[+]|[-]|[/]|[*])+\s*[)]\s*$/;
    var lvl = 0;

    var expr_s = remove_whitespace(expr_node.expr);
    if (num_expr.test(expr_s)) {
        expr_node.root = parseFloat(expr_s);
    } else {
        if(paren_expr.test(expr_s))
        {
            expr_s = expr_s.slice(1, expr_s.length-1);
        }
        var c = '';
        var fail = false;

        for (var i = 0, len = expr_s.length; i < len; i++) {
            c = expr_s[i];
            if (c == "(") {
                lvl += 1;
            } else if (c == ")") {
                lvl -= 1;
            } else {
                if (lvl === 0) {
                    var op = is_operator(c);
                    if (op[0]) {
                        var left = expr_s.slice(0, i);
                        var right = expr_s.slice(i + 1, expr_s.length);
                        expr_node.left = {
                            expr: left
                        };
                        expr_node.right = {
                            expr: right
                        };
                        expr_node.operation = op[1];
                        expr_node.op = c;
                        break;
                    }
                }
            }
        }
        parse_expr(expr_node.left);
        parse_expr(expr_node.right);
    }
}



function failure() {
    $('#result' + "_output").removeClass();
    $('#result' + "_output").addClass("form-group has-error has-feedback");
    $('#result' + "_verification").removeClass();
    $('#result' + "_verification").addClass("glyphicon glyphicon-remove form-control-feedback");
}

function correct() {
    $('#result' + "_output").removeClass();
    $('#result' + "_output").addClass("form-group has-success has-feedback");
    $('#result' + "_verification").removeClass();
    $('#result' + "_verification").addClass("glyphicon glyphicon-ok form-control-feedback");
}

function remove_whitespace(s) {
    var init = false;
    var start = 0;
    var end = s.length;

    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (c != ' ') {
            if (!init) {
                start = i;
                init = true;
            } else {
                end = i;
            }
        }
    }
    var ret = s.slice(start, end + 1);
    // $('#result').val(ret);

    return ret;
}

function sum(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

function times(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function is_operator(c) {
    var op = '';
    var opt = false;
    var func = {
        '+': sum,
        '-': minus,
        '*': times,
        '/': divide
    };
    var ops = ['+', '-', '*', '/'];
    for (var i = 0; i < ops.length; i++) {
        if (ops[i] == c) {
            op = c;
            opt = true;
            break;
        }
    }

    return [opt, func[op]];
}

// 1 + 1 + (1/2) + (1/(1*2*3)) + (1/(1*2*3*4))+ (1/(1*2*3*4*5)) + (1/(1*2*3*4*5*6))+ (1/(1*2*3*4*5*6*7))+ (1/(1*2*3*4*5*6*7*8))+ (1/(1*2*3*4*5*6*7*8*9))+ (1/(1*2*3*4*5*6*7*8*9*10))+ (1/(1*2*3*4*5*6*7*8*9*10*11)) + (1/(1*2*3*4*5*6*7*8*9*10*11*12)) + (1/(1*2*3*4*5*6*7*8*9*10*11*12*13))
