const data = (data) => ({
  err: null,
  data,
});

const err = (err) => ({
  err,
  data: null,
});

const paginationData = (data, meta) => ({
  err: null,
  data,
  meta,
});

const response = (res, type, result, message = "", code = 200) => {
  let status = true;
  let data = result.data;
  if (type === "fail") {
    status = false;
    data = "";
    message = result.message || message;
    code = result.code || code;
  }
  res.status(code).json({
    success: status,
    data,
    message,
    code,
  });
};

const paginationResponse = (res, type, result, message = "", code = 200) => {
    let status = true;
    let data = result.data;
    if (type === "fail") {
        status = false;
        data = "";
        message = result.message || message;
    }
    res.status(code).json({
        success: status,
        data,
        meta: result.meta,
        message,
        code,
    });
}

module.exports = {
    data,
    err,
    paginationData,
    response,
    paginationResponse
}
