const Bin = require('../models/companybin.model');

// Create A Bin
const createBin = async (req, res) => {
    const binID = req.body.binID;
    const findBin = await Bin.findOne({ binID: binID });
    if (!findBin) {
        try {
            const newBin = await Bin.create(req.body);
            const { binName, binID, binLocation, binOpenTime, binCloseTime } = newBin;

            res.json({
                newBin,
                success: true,
                msg: 'Bin Is Added Successfully!'
            });

        } catch (error) {
            res.status(500).json({ msg: 'Error for Adding an Bin', success: false });
        }
    } else {
        res.json({ msg: 'Bin is already Added', success: false })
    }
}

// Read bins
const getAllBins = async (req, res) => {
    try {
        const AllBin = await Bin.find();
        res.json(AllBin)
    } catch (error) {
        res.status(400).json(error)
    }
}

// Get A Bin
const getBin = async (req, res) => {
    const { id } = req.params;
    const cleanId = id.trim();

    try {
        const getABin = await Bin.findById(cleanId);

        if (!getABin) {
            return res.status(404).json({ error: "Bin not found" });
        }

        res.json(getABin);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Update A Bin
const updateBin = async (req, res) => {
    const { id } = req.params;
    const cleanId = id.trim();
    console.log(cleanId);
    try {
        const updateBin = await Bin.findByIdAndUpdate(
            cleanId,
            {
                binName: req?.body?.binName,
                binID: req?.body?.binID,
                binLocation: req?.body?.binLocation,
                binOpenTime: req?.body?.binOpenTime,
                binCloseTime: req?.body?.binCloseTime
            },
            {
                new: true,
            }
        );
        res.json(updateBin)
    } catch (error) {
        res.status(404).json(error)
    }
}

// Delete A Bin
const deleteBin = async (req, res) => {
    const { id } = req.params;
    const cleanId = id.trim();
    try {
        const deleteBin = await Bin.findByIdAndDelete(cleanId);
        res.json({ msg: 'Bin Deleted Successfully!', deleteBin });
    } catch (error) {
        res.status(402).json(error);
    }
}

module.exports = { createBin, getAllBins, getBin, updateBin, deleteBin };
