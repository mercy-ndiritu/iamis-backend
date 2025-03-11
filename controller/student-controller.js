//upload students dTA TO DB
export const uploadData = async (req, res) => {
    const {name, reg} = req.body

    res.status(200).json({name:name, reg:reg})
}