import Piece from './Piece';

class Tetris {
    constructor() {
        this.board = [...Array(21).keys.map(i=>[...Array(10).keys].map(j=>0))];
        this.current = {
            piece: null,
            location: null
        };
        this.gameOn = true;
        this.score = 0;
        this.level = 1;
        this.levelsCompleted = 0;
    }

    placePiece(coords=this.current.location) {
        const piece = this.current.piece;
        const n = piece.length;
        for (let i=0;i<n;i++) {
            for (let j=0;j<n;j++) {
                tetris[x+i][y+j]=piece[i][j];
            }
        }
        this.current.location = [x, y];
    }

    getPiece() {
        const piece = new Piece();
        this.current = {
            shape: piece,
            location: [4-piece.length, 3]
        }
        this.placePiece();
    }

    canLowerPiece() {
        const lows = this.current.piece.bottomLevel().map((num,i)=>num?[this.current.location[0],this.current.location[1]+i]:null)
        const checks = lows.map(low=>low?[low[0]+1,low[1]]:null)
        return !checks.find(check=>check && this.board[check[0],check[1]]);
    }

    lowerPiece() {
        if (this.canLowerPiece()) this.placePiece([this.current.location[0]+1, this.current.location[1]]);
        else this.getPiece();
    }

    renderBoard() {
        this.board.slice(3,21).map(row=>row.map(col=>col?"X":" "));
    }

    checkBoard() {
        if (this.current.location < 3 && !this.canLowerPiece()) this.gameOn = false;
        else {
            const completedRows = [...Array(this.board.length).keys()].find(i=>this.board[i].find(col=>!col)===undefined);
            completedRows.forEach(i=>{
                this.board.splice(i,1);
                this.board.unshift([...Array(10).keys()].map(i=>0));
                this.score += 40 * this.level;
                this.levelsCompleted += 1;
                if (this.levelsCompleted === 10) {
                    this.level += 1;
                    this.levelsCompleted = 0;
                }
            })
        }
    }
}

export default Tetris;