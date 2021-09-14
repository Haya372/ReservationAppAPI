const equal = (obj1, obj2) => {
  if((typeof obj1 != 'object') || (typeof obj2 != 'object')){
    return obj1 == obj2;
  }
  if(obj1 == obj2) {
    return true;
  }
  let ok = true;
  if(Array.isArray(obj1)){
    obj1.sort()
  }
  if(Array.isArray(obj2)){
    obj2.sort()
  }
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
  if(Object.keys(obj1).length != Object.keys(obj2).length){
    ok = false;
  }
  return ok;
}

export default equal;