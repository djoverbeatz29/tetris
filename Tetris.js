import Piece from './Piece';

class Tetris {
    constructor() {
        this.board = [...Array(21).keys()].map(i=>[...Array(10).keys()].map(j=>0));
        this.current = {
            piece: null,
            location: null
        };
        this.gameOn = true;
        this.score = 0;
        this.level = 1;
        this.levelsCompleted = 0;
        this.getPiece();
    }

    placePiece(coords=this.current.location) {
        const [currX, currY] = this.current.location;
        const [x, y] = coords;
        const piece = this.current.piece;
        const shape = piece.piece;
        const n = shape.length;
        for (let i=0;i<n;i++) {
            for (let j=0;j<n;j++) {
                if (shape[i][j]===1) this.board[currX+i][currY+j]=0;
            }
        }
        for (let i=0;i<n;i++) {
            for (let j=0;j<n;j++) {
                this.board[x+i][y+j]=shape[i][j];
            }
        }
        this.current.location = [x, y];
    }

    getPiece() {
        const piece = new Piece();
        this.current = {
            piece: piece,
            location: [4-piece.piece.length, 3]
        }
        this.placePiece();
    }

    canMoveDown() {
        const lows = this.current.piece.bottommost().map((num,i)=>num!==undefined?[this.current.location[0]+num,this.current.location[1]+i]:null)
        const checks = lows.map(low=>low!==undefined?[low[0]+1,low[1]]:null)
        return !checks.find(check=>(check && (check[0]>=21 || this.board[check[0]][check[1]])));
    }

    canMoveLeft() {
        const lefts = this.current.piece.leftmost().map((num,i)=>num!==undefined?[t.current.location[0]+i,this.current.location[1]+num]:null);
        const checks = lefts.map(left=>left!==undefined?[left[0],left[1]-1]:null);
        return !checks.find(check=>(check && (check[1]<0 || this.board[check[0]][check[1]])));
    }

    canMoveRight() {
        const rights = this.current.piece.rightmost().map((num,i)=>num!==undefined?[this.current.location[0]+i,this.current.location[1]+num]:null);
        const checks = rights.map(right=>right!==undefined?[right[0],right[1]+1]:null);
        return !checks.find(check=>(check && (check[1]>=10 || this.board[check[0]][check[1]])));
    }

    moveDown() {
        if (this.canMoveDown()) this.placePiece([this.current.location[0]+1, this.current.location[1]]);
        else this.getPiece();
    }

    moveLeft() {
        if (this.canMoveLeft()) this.placePiece([this.current.location[0], this.current.location[1]-1]);
    }

    moveRight() {
        if (this.canMoveRight()) this.placePiece([this.current.location[0], this.current.location[1]+1]);
    }

    rotate() {
        this.current.piece.rotate();
        this.placePiece();
    }

    renderBoard() {
        console.log(this.board.slice(0,21).map(row=>row.map(col=>col?"X":" ").join('')).join('\n'));
    }

    checkBoard() {
        if (this.current.location < 3 && !this.canLowerPiece()) this.gameOn = false;
        else {
            const completedRows = [...Array(this.board.length).keys()].filter(i=>this.board[i].find(col=>!col)===undefined);
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