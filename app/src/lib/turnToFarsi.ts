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
if(slug == 'ACTIVE'){
  return "فعال"
}
if(slug == 'SEMI_ACTIVE'){
  return "درحال بررسی"
}
if(slug == 'DEACTIVE'){
  return "غیرفعال"
}
else{
  return slug
}
}