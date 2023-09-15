import slugify from "slugify";
import fs from "fs";
import productModel from "../model/productModel.js";
import categoryModel from "../model/categoryModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created Successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error,
    });
  }
};
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Updated Product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Product",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting All Product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Single Product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Deleting Product",
      error,
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const {checked,radio} = req.body
    let args = {}
    if(checked.length>0) args.category= checked;
    if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]};
    const products = await productModel.find(args).select("-photo");
    res.status(200).send({
        success:true,
        products
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Filtering Product",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Counting Product",
          error,
        });
      }
};

export const productListController = async (req, res) => {
    try {
        const perpage = 6;
        const page = req.params.page ? req.params.page : 1 ;
        const products = await productModel.find({}).select("-photo").skip((page-1) * perpage).limit(perpage);
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Page List",
          error,
        });
      }
    };

    //search Product
    export const searchProductController = async (req, res) => {
      try {
        const {keyword} = req.params;
        const result = await productModel.find({
          $or:[
            {name: {$regex : keyword, $options:"i"}},
            {description: {$regex : keyword, $options:"i"}}
            ]
          }).select("-photo");
          res.json(result);
    
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error In Search Product",
          error,
        });
      }
    };

    //similar Product
    export const similarProductController = async (req, res) => {
      try {
        const {pid,cid} = req.params;
        const products = await productModel.find({
          category:cid,
          _id:{$ne:pid}
        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
          success:true,
          products
        })
      }catch(error){
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error In Search Product",
          error,
        });
      }
    };

    //product category Controller
    export const productCategoryController = async (req, res) => {
      try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        const products = await productModel.find({category}).populate("category").select("-photo");
        res.status(200).send({
          success: true,
          products,
          category
        });
      }catch(error){
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error In Search Product",
          error,
        });
      }
    };