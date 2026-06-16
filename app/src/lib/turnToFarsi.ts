export function turnToFarsi(slug:string){
if(slug == 'mobile'){
  return "موبایل"
}
if(slug == 'real-estate'){
  return "املاک"
}
if(slug == 'vehicle'){
  return "خودرو"
}
else{
  return slug
}
}