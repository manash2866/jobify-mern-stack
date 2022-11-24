const notFoundMiddleware = (req,res) =>{
    res.status(404).send('route not found')
}

export default notFoundMiddleware