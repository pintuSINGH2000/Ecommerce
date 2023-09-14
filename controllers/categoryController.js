import slugify from "slugify";
import categoryModel from "../model/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is Required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Created",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name)
    }).save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const {name} = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "update Category Successfully",
      category
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Category Update",
      error
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({ slug: req.params.slug });
    res.status(201).send({
      success: true,
      message: "Get Single Category Successfully",
      category
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting single Category",
      error
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(201).send({
      success: true,
      message: "All Category List",
      category
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Category",
      error,
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(201).send({
        success: true,
        message: "Category Deleted Successfully",
      });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Deleteing Category",
      error
    });
  }
};
