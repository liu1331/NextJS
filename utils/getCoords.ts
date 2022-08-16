export const getCoords = (e:any)=>{
    let x = 0;
    let y = 0;
    if(!e.target) return {x,y}
    x = e.pageX - e.target.offsetLeft;
    y = e.pageY - e.target.offsetTop;
    return {x,y}
}