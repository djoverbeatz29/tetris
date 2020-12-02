import pieceDict from './PieceDict';

class Piece {
    constructor(n=Math.ceil(7 * Math.random())) {
        this.piece = pieceDict[n];
    }

    rotate() {
        const copy = JSON.parse(JSON.stringify(this.piece));
        const n = this.piece.length;
        for (let i=0;i<n;i++) {
            for (let j=0;j<n;j++) {
                copy[i][n-1-j] = this.piece[j][i];
            }
        }
        this.piece = copy;
    }

    renderPiece() {
        console.log(this.piece.map(row=>row.map(col=>col?"X":" ").join('')).join('\n'))
    }

    leftmost() {
        const n = this.piece.length;
        return [...Array(n).keys()].map(i=> {
            for (let j=0;j<n;j++) {
                if (this.piece[i][j]) {
                    return j;
                }
            }
            return null;
        })
    }

    rightmost() {
        const n = this.piece.length;
        return [...Array(n).keys()].map(i=> {
            for (let j=n-1;j>=0;j--) {
                if (this.piece[i][j]) {
                    return j;
                }
            }
            return null;
        })
    }

    bottommost() {
        const n = this.piece.length;
        return [...Array(n).keys()].map(i=> {
            for (let j=n-1;j>=0;j--) {
                if (this.piece[j][i]) {
                    return j;
                }
            }
            return null;
        })
    }

}

export default Piece;