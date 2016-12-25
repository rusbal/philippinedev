function parsePGN(raw_pgn){
    var arr,
        start = false,
        move_pair = [],
        ret_moves = [],
        result,
        len,
        x;

    raw_pgn = raw_pgn.replace(/[^{}]+(?=})/g, " ").trim();
    raw_pgn = raw_pgn.replace(/(\[.*?\])/g, " ").trim();
    raw_pgn = raw_pgn.replace(new RegExp("(\r?\n|\n|\r)", "mg"), " ");
    raw_pgn = raw_pgn.replace(/\.(\S)/g, '. $1');

    arr = raw_pgn.split(' '),
    len = arr.length;

    for (x = 0; x < len; x += 1){
        if (start === false && arr[x] == "1."){
            start = true;
            continue;
        }

        if (start === false){
            continue;
        }

        if (arr[x][arr[x].length-1] == "."){

            ret_moves.push(move_pair);
            move_pair = [];

        } else {

            if (arr[x][0] === '{' || arr[x][0] === '}') {
                continue;
            }

            if (arr[x]) {
                move_pair.push(arr[x]);
            }
        }
    }

    if (move_pair) {
        ret_moves.push(move_pair);
    }

    if ( "abcdefghRNBQKO".indexOf(arr[len -1][0]) == -1 ) {
        /**
         * Consider as game result
         */

        // Remove result from moves
        result = ret_moves[ret_moves.length -1].pop();
    } else {
        result = "-";
    }

    return {
        moves: ret_moves,
        result: result
    };
}

function addSeparatorPGN(raw_pgn){
    var ret_moves = [],
        len = raw_pgn.length,
        x;

    for (x = 0; x < len; x += 1){
        ret_moves.push( [ addSeparatorToMove(raw_pgn[x][0]), addSeparatorToMove(raw_pgn[x][1]) ] );
    }

    return ret_moves;
}

function addSeparatorToMove(raw_move){
    var move,
        len;

    if (typeof raw_move === 'undefined') {
        return raw_move;
    }

    len = raw_move.length;

    if (2 == len){
        /**
         * Pawn move
         */
        move = 'o-' + raw_move;

    } else if (len > 2 && "+?!".indexOf(raw_move.substring(2, 3)) >= 0 ) {
        /**
         * Pawn move
         */
        move = 'o-' + raw_move;

    } else {

        if (raw_move.substring(0, 3) === 'O-O'){
            /**
             * Castle move
             */
            move = raw_move;

        } else {

            if (raw_move.substring(1, 2) === 'x'){
                /**
                 * Capture move
                 */
                move = raw_move;

            } else {
                /**
                 * Other piece move
                 * TODO: check characters 2 and 3 using regex
                 */
                if (len > 3 && "abcdefgh".indexOf(raw_move.substring(2, 3)) >= 0 ) {
                    /**
                     * Third character is column name, we assume to second character is "from" column name
                     */
                    move = raw_move.substring(0, 2) + '-' + raw_move.substring(2);
                } else {
                    move = raw_move[0] + '-' + raw_move.substring(1);
                }
            }
        }
    }

    return move;
}

function isValidMove(board, move_color, piece, from_rank, from_column, dest_rank, dest_column){

    if ("N" === piece) {

        return isKnightMove(from_rank, from_column, dest_rank, dest_column);

    } else if ("B" === piece) {

        return isBishopMove(board, move_color, from_rank, from_column, dest_rank, dest_column);

    } else if ("R" === piece) {

        return isRookMove(board, move_color, from_rank, from_column, dest_rank, dest_column);

    } else if ("Q" === piece) {

        if (isRookMove(board, move_color, from_rank, from_column, dest_rank, dest_column)) {
            return true;
        }

        return isBishopMove(board, move_color, from_rank, from_column, dest_rank, dest_column);

    } else if ("K" === piece) {

        if (isRookMove(board, move_color, from_rank, from_column, dest_rank, dest_column)) {
            return true;
        }

        return isBishopMove(board, move_color, from_rank, from_column, dest_rank, dest_column);

    } else {

        return false;

    }

}

function isRookMove(board, move_color, from_rank, from_column, dest_rank, dest_column){
    var possible_moves = [],
        len,
        rank,
        column,
        test_rank,
        test_column;

    len = possible_moves.length;

    test_rank = from_rank;

    while ( (test_rank -= 1) >= 0){
        if ("" !== board[test_rank][from_column]) {
            if (board[test_rank][from_column].c === move_color) {
                // Ally piece blocking here
                break;
            } else {
                // Capture enemy
                possible_moves.push([test_rank, from_column]);
            }
        } else {
            // Empty square
            possible_moves.push([test_rank, from_column]);
        }
    }

    test_rank = from_rank;

    while ( (test_rank += 1) <= 7){
        if ("" !== board[test_rank][from_column]) {
            if (board[test_rank][from_column].c === move_color) {
                // Ally piece blocking here
                break;
            } else {
                // Capture enemy
                possible_moves.push([test_rank, from_column]);
            }
        } else {
            // Empty square
            possible_moves.push([test_rank, from_column]);
        }
    }

    test_column = from_column;

    while ( (test_column -= 1) >= 0){
        if ("" !== board[from_rank][test_column]) {
            if (board[from_rank][test_column].c === move_color) {
                // Ally piece blocking here
                break;
            } else {
                // Capture enemy
                possible_moves.push([from_rank, test_column]);
            }
        } else {
            // Empty square
            possible_moves.push([from_rank, test_column]);
        }
    }

    test_column = from_column;

    while ( (test_column += 1) <= 7){
        if ("" !== board[from_rank][test_column]) {
            if (board[from_rank][test_column].c === move_color) {
                // Ally piece blocking here
                break;
            } else {
                // Capture enemy
                possible_moves.push([from_rank, test_column]);
            }
        } else {
            // Empty square
            possible_moves.push([from_rank, test_column]);
        }
    }

    len = possible_moves.length;

    for (x = 0; x < len; x += 1){
        if (possible_moves[x][0] === dest_rank && possible_moves[x][1] === dest_column){
            // console.log('\t\tMatched: ', [ possible_moves[x][0]+1, possible_moves[x][1]+1] );
            return true;
        } else {
            // console.log('\t\tNo match: ', [ possible_moves[x][0]+1, possible_moves[x][1]+1] );
        }
    }

    return false;
}

function isBishopMove(board, move_color, from_rank, from_column, dest_rank, dest_column){
    var possible_moves = [],
        len,
        rank,
        column,
        rank_minus,
        rank_plus,
        column_minus,
        column_plus;

    // console.log('\tCheck Bishop on: ', from_rank+1, from_column+1);

    rank_minus = from_rank;
    column_minus = from_column;
    column_plus = from_column;

    while ( (rank_minus -= 1) >= 0){
        column_minus -= 1;
        column_plus += 1;
        
        if (column_minus >= 0){
            if ("" !== board[rank_minus][column_minus]) {
                if (board[rank_minus][column_minus].c === move_color) {
                    column_minus = -999;
                } else {
                    // capture enemy
                    possible_moves.push([rank_minus, column_minus]);
                }
            } else {
                possible_moves.push([rank_minus, column_minus]);
            }
        }

        if (column_plus <= 7){
            if ("" !== board[rank_minus][column_plus]) {
                if (board[rank_minus][column_plus].c === move_color) {
                    column_plus = 999;
                } else {
                    // capture enemy
                    possible_moves.push([rank_minus, column_plus]);
                }
            } else {
                possible_moves.push([rank_minus, column_plus]);
            }
        }
    }

    rank_plus = from_rank;
    column_minus = from_column;
    column_plus = from_column;

    while ( (rank_plus += 1) <= 7){
        column_minus -= 1;
        column_plus += 1;
        
        if (column_minus >= 0){
            if ("" !== board[rank_plus][column_minus]) {
                if (board[rank_plus][column_minus].c === move_color) {
                    column_minus = -999;
                } else {
                    // capture enemy
                    possible_moves.push([rank_plus, column_minus]);
                }
            } else {
                possible_moves.push([rank_plus, column_minus]);
            }
        }

        if (column_plus <= 7){
            if ("" !== board[rank_plus][column_plus]) {
                if (board[rank_plus][column_plus].c === move_color) {
                    column_plus = 999;
                } else {
                    // capture enemy
                    possible_moves.push([rank_plus, column_plus]);
                }
            } else {
                possible_moves.push([rank_plus, column_plus]);
            }
        }
    }

    len = possible_moves.length;

    for (x = 0; x < len; x += 1){
        if (possible_moves[x][0] === dest_rank && possible_moves[x][1] === dest_column){
            // console.log('\t\tMatched: ', [ possible_moves[x][0]+1, possible_moves[x][1]+1] );
            return true;
        // } else {
            // console.log('\t\tNo match: ', [ possible_moves[x][0]+1, possible_moves[x][1]+1] );
        }
    }

    return false;
}

function isKnightMove(from_rank, from_column, dest_rank, dest_column){
    var possible_moves = [],
        len,
        x;

    // console.log('Check N move: ', from_rank, from_column, dest_rank, dest_column);

    possible_moves.push( [from_rank -2, from_column -1] );
    possible_moves.push( [from_rank -2, from_column +1] );

    possible_moves.push( [from_rank -1, from_column -2] );
    possible_moves.push( [from_rank -1, from_column +2] );

    possible_moves.push( [from_rank +1, from_column -2] );
    possible_moves.push( [from_rank +1, from_column +2] );

    possible_moves.push( [from_rank +2, from_column -1] );
    possible_moves.push( [from_rank +2, from_column +1] );

    len = possible_moves.length;

    for (x = 0; x < len; x += 1){
        if (possible_moves[x][0] === dest_rank && possible_moves[x][1] === dest_column)
            return true;
    }

    return false;
}

function assignGame(){
    return "[Event \"London\"]" +
        "\n [Site \"London\"]" +
        "\n [Date \"1851.??.??\"]" +
        "\n [EventDate \"?\"]" +
        "\n [Round \"?\"]" +
        "\n [Result \"1-0\"]" +
        "\n [White \"Adolf Anderssen\"]" +
        "\n [Black \"Kieseritzky\"]" +
        "\n [ECO \"C33\"]" +
        "\n [WhiteElo \"?\"]" +
        "\n [BlackElo \"?\"]" +
        "\n [PlyCount \"45\"]" +
        "\n " +
        "\n 1.e4 e5 2.f4 exf4 3.Bc4 Qh4+ 4.Kf1 b5 5.Bxb5 Nf6 6.Nf3 Qh6" +
        "\n 7.d3 Nh5 8.Nh4 Qg5 9.Nf5 c6 10.g4 Nf6 11.Rg1 cxb5 12.h4 Qg6" +
        "\n 13.h5 Qg5 14.Qf3 Ng8 15.Bxf4 Qf6 16.Nc3 Bc5 17.Nd5 Qxb2 18.Bd6" +
        "\n Bxg1 {It is from this move that Black's defeat stems. Wilhelm" +
        "\n Steinitz suggested in 1879 that a better move would be" +
        "\n 18... Qxa1+; likely moves to follow are 19. Ke2 Qb2 20. Kd2" +
        "\n Bxg1.} 19. e5 Qxa1+ 20. Ke2 Na6 21.Nxg7+ Kd8 22.Qf6+ Nxf6" +
        "\n 23.Be7# 1-0";
}

// eof
