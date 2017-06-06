define(
  'yit.module.catagory', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm',
    'yit.api.fcategoryentity.getFCategoryEntityWithActive'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm, YitCatagory) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var valentine = can.Control.extend({

      // {
      //   imgUrl: "",
      //   title: "",
      //   link: "",
      //   second:[{
      //     title: "",
      //     parentId: "",
      //     id: "",
      //     third:[{
      //       id:"",
      //       title: ""
      //     }]
      //   }]
      // }    数据对象结构
      firstLevel: null,
      init: function(element, options) {
          var catagory = new YitCatagory();
          var that = this;
          can.when(catagory.sendRequestByType())
            .then(function(data){
               if(data && data.value){
                 that.getAllCatagory(data.value);
               }
            }, function(error){

            });
      },

      getAllCatagory: function(value){
         if(value.children && value.children.length > 0){
           this.firstLevel = {};
           var that = this;
            _.each(value.children, function(item){
              if(item.isShow && item.isActive){ //是否可见，是否启用
                that.firstLevel[item.id] = {
                  imgUrl: item.imageUrl,
                  title: item.title,
                  link: item.linkUrl
                };

                if(item.children && item.children.length > 0){
                   _.each(item.children, function(item1){
                    var sValue = [];
                     if(item1.isActive && item1.isShow){
                        sValue.push({
                          title: item1.title,
                          parentId: item.id,
                          id: item1.id
                        });
                     }

                     if(item1.children && item1.children.length > 0){
                      var children = [];
                       _.each(item1.children, function(temp){
                          if(temp.isShow && temp.isActive){
                            children.push({
                            id:temp.id,
                            title: temp.title
                          });
                        }
                       });
                       sValue.third = children;
                       that.firstLevel[item.id]["second"] = sValue;
                     }
                   });
                }
              }
            });
         }
      },


      ".button click": function(el, event){
        
      }
    })

    var modules = $('.cms-lover');

    if(modules && modules.length > 0){
        new valentine(modules[0]);
    }
  })