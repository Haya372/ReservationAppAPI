const equal = (obj1, obj2) => {
  if((typeof obj1 != 'object') || (typeof obj2 != 'object')){
    return obj1 == obj2;
  }
  let ok = true;
  Object.keys(obj1).forEach((key) => {
    if(!ok){
      return;
    }
    if(obj2[key] == undefined){
      ok = false;
      return;
    }
    ok = ok && equal(obj1[key], obj2[key]);
  })
  if(Object.keys(obj1).length == 0){
    if(Object.keys(obj2) != 0) ok = false;
  }
  return ok;
}

export default equal;