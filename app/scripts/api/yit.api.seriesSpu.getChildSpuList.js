// Auto Generated.  DO NOT EDIT!
/**
  * @class yit.api.seriesSpu.getChildSpuList
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'yit.api.seriesSpu.getChildSpuList',
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
        _mt: 'seriesSpu.getChildSpuList',
        _ts: Date.now(),
        _aid: 1
      },
      HTTP_METHOD: 'post',
      /**
      * METHOD_NAME: 'seriesSpu.getChildSpuList',
      * SECURITY_TYPE: SecurityType.None.name,
      **/
      REQUIRED: {
        'parentSpuId': 'int',
      },
      OPTIONAL: {
        'tag1': 'string',
        'tag2': 'string',
        'onlyValid': 'boolean'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    }
  });
});