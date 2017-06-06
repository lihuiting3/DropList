// Auto Generated.  DO NOT EDIT!
/**
  * @class yit.api.b2cmall.getSubMData
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'yit.api.b2cmall.getSubMData',
[
  'zepto',
  'can',
  'lodash',
  'yit.framework.comm',
  'yit.api.security.type'
],
function($, can, _, Comm, SecurityType) {
  'use strict';

  return Comm.extend({
    api: {
      COMMON:{
        _mt: 'b2cmall.getSubMData',
        _ts: Date.now(),
        _aid: 1
      },
      HTTP_METHOD: 'post',
      REQUIRED: {
        pageId:"int",
        listId:"int",
        pageNumber:"int"
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    }
  });
});