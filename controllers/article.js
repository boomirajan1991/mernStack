const ArticleModel = require('../models/article')
const CODE = require('../utils/code')

const addarticle = async (req, res, next) => {
  console.log(req.body)
  const { title, article, authorname } = req.body
  const articleimage = (req.file !== '' && req.file !== undefined && req.file !== null)
    ? req.file.filename
    : ''
  const addarticle = await new ArticleModel({
    title,
    article,
    authorname,
    articleimage
  })
  addarticle.save().then(() => {
    return res.json({
      success: true,
      message: CODE.MESSAGE_CODE.ADD_ARTICLE_SUCCESS,
      addarticle
    })
  }, (error) => {
    console.log(error)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

const updatearticle = async (req, res, next) => {
  const { title, article, authorname } = req.body
  const articleimage = (req.file !== '' && req.file !== undefined && req.file !== null)
    ? req.file.filename
    : ''
  const articleUpdate = {
    title,
    article,
    authorname,
    articleimage
  }
  if (articleimage === '') {
    delete articleUpdate.articleimage
  }
  await ArticleModel.findOneAndUpdate({ _id: req.body.article_id }, articleUpdate, { new: true }).then((article) => {
    if (article) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_ARTICLE_SUCCESS,
        article
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_ARTICLE_FAILED
      })
    }
  }, (error) => {
    console.log(error)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

const getallarticle = async (req, res, next) => {
  const getAllArticle = await ArticleModel.aggregate([{ $match: { articlestatus: { $eq: true } } }]).sort({ _id: -1 })
  if (getAllArticle.length > 0) {
    return res.json({
      success: true,
      message: CODE.MESSAGE_CODE.GET_ALL_ARTICLE_SUCCESS,
      getAllArticle_length: getAllArticle.length,
      getAllArticle
    })
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.NO_DATA_FOUND,
      getAllArticle: {}
    })
  }
}

const getarticle = async (req, res, next) => {
  const getArticle = await ArticleModel.findOne({ _id: req.body.article_id })
  if (getArticle) {
    return res.json({
      success: true,
      message: CODE.MESSAGE_CODE.GET_ARTICLE_SUCCESS,
      getArticle
    })
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const updateArticleStatus = async (req, res, next) => {
  const { articlestatus } = req.body
  await ArticleModel.findOneAndUpdate({ _id: req.body.article_id }, { $set: { articlestatus } }, { new: true }).then((article) => {
    if (article) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_ARTICLE_SUCCESS,
        article
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_ARTICLE_FAILED
      })
    }
  }, (error) => {
    console.log(error)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

module.exports = { addarticle, updatearticle, getallarticle, getarticle, updateArticleStatus }
