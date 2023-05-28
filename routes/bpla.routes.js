const { Router } = require("express");
const { Bpla } = require("../models/Bpla");
const router = Router();
const multer = require("multer");
const path = require("path");
const config = require("config");

router.get("/", async (req, res) => {
  try {
    const rangeParams = [];
    const valueParams = {};

    for (let key in req.query) {
      if (key.includes("_min")) {
        const name = key.replace("_min", "");
        const min = parseInt(req.query[`${name}_min`]);

        rangeParams.push({ name, min });
      } else if (key.includes("_max")) {
        const name = key.replace("_max", "");
        const max = parseInt(req.query[`${name}_max`]);

        rangeParams.push({ name, max });
      } else if (
        key.includes("_str") &&
        key !== "text_str" &&
        key !== "sort_str"
      ) {
        const name = key.replace("_str", "");
        let value = req.query[key];
        if (!Array.isArray(value)) {
          value = [value];
        }
        valueParams[name] = value;
      } else if (key.includes("_num")) {
        const name = key.replace("_num", "");
        const value = parseInt(req.query[name]);
        valueParams.push({ name, value });
      }
    }

    let queryToBD = null;

    if (req.query.text_str) {
      const regex = new RegExp(`.*${req.query.text_str}.*`, "i");
      queryToBD = Bpla.find({
        $or: [
          { _name: { $regex: regex } },
          { model: { $regex: regex } },
          { shortDescription: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      });
    } else {
      queryToBD = Bpla.find();
    }

    if (rangeParams.length !== 0) {
      for (let param of rangeParams) {
        if (param.min) {
          queryToBD.where(param.name).gte(param.min);
        } else if (param.max) {
          queryToBD.where(param.name).lte(param.max);
        }
      }
    }

    if (valueParams) {
      for (let [name, params] of Object.entries(valueParams)) {
        queryToBD.find({ [`${name}`]: { $in: [...params] } });
      }
    }

    if (req.query.sort_str) {
      queryToBD.sort({ [req.query.sort_str]: parseInt(req.query.order || 1) });
    } else {
      queryToBD.sort({ _name: parseInt(req.query.order || 1) });
    }

    const page = parseInt(req.query.page ?? 0); // start from 0 page
    const limit = parseInt(req.query.limit ?? 8);

    const countTotal = await Bpla.count(queryToBD);
    const listBpla = await queryToBD.skip(page * limit).limit(limit);

    if (!listBpla) {
      return res
        .status(404)
        .json({ message: "БПЛА не знайдені за заданими парараметрами" });
    }

    res.json({ countTotal, listBpla });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bpla = await Bpla.findById(req.params.id);

    if (!bpla) {
      return res.status(404).json({ message: "Такий БПЛА не існує" });
    }

    res.json(bpla);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bplaId = req.params.id;

    await Bpla.findByIdAndDelete(bplaId);

    res.json({ message: "Bpla успішно видалено!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка при видаленні Bpla" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.put("/:id", upload.array("photos"), async (req, res) => {
  try {
    const bplaId = req.params.id;

    const photos = [];
    for (let file of req.files) {
      photos.push(
        config.get("baseUrl") + path.join("/uploads/" + file.filename)
      );
    }

    const updatedData = {
      photos: photos,
      _name: req.body._name,
      model: req.body.model,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      sourceUrl: req.body.sourceUrl,
      vendor: req.body.vendor,
      contryVendor: req.body.contryVendor ?? "",
      typeEngine: req.body.typeEngine ?? "",
      functions: req.body.functions,
      levelsApply: req.body.levelsApply ?? "",
      levelWarActions: req.body.levelWarActions ?? "",
      _class: req.body._class,
      flightRange: req.body.flightRange,
      wingspan: req.body.wingspan,
      maxFlyWeight: req.body.maxFlyWeight,
      payloadWeight: req.body.payloadWeight,
      maxSpeed: req.body.maxSpeed,
      cruiseSpeed: req.body.cruiseSpeed,
      maxFlyHeight: req.body.maxFlyHeight,
      heightOfUse: req.body.heightOfUse,
      flyDuration: req.body.flyDuration,
    };

    const updatedBpla = await Bpla.findByIdAndUpdate(bplaId, updatedData, {
      new: true,
    });

    if (!updatedBpla) {
      return res.status(404).json({ message: "Такий БПЛА не існує" });
    }

    res.json(updatedBpla);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка при оновленні БПЛА" });
  }
});

module.exports = router;
