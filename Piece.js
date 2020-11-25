import pieceDict from './PieceDict';

class Piece {
    constructor() {
        this.piece = pieceDict[Math.ceil(7 * Math.random())];
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

    bottomLevel() {
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