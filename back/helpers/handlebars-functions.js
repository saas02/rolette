
const _isValid = (value, value2) => {
    return (value === value2) ? true : false;
}

const _differenceYears = (data) => {    
    let currentDate = new Date().getFullYear();    
    let years = Math.floor(currentDate - data);
    return years;    
}

const _clearElements = ( body,  dataFood) => {
    let data = body.items.concat(dataFood.items);
    
    let hash = {};
    data = data.filter(o => {                
        return hash[o.item+'-'+o.type] ? false : hash[o.item+'-'+o.type] = o        
    });

    return data;
}


module.exports = {
    _isValid,
    _differenceYears,
    _clearElements
}