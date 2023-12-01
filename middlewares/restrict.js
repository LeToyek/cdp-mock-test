module.exports = (req,res,next) => {
  if(req.isAuthenticated()){
    return next();
  }
  return res.status(403).json({message: 'You are not authorized to view this page'});
}