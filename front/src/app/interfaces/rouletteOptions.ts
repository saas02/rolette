export interface rouletteOptions {    
    items:Array<rouletteOption>;    
}

interface rouletteOption {
    item: string;
    type: string;
}