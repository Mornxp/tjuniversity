
(function () {
    function Dropdown(options) {
        this.wrap = options.wrap;
        this.title = options.title || '';
        this.menuList = options.menuList || [];
        this.direction = options.direction || 'y';
        this.width = options.width;
        this.createDom();
        this.initStyle();
        this.bindEvent();
    }

    Dropdown.prototype.createDom = function () {

        $(this.wrap).append($('<a class="dropdown-btn" href="#">' + this.title + '&nbsp;&nbsp;/</a>' ));
        if(this.direction == 'x'){
            var dopDownDiv = $('<div class="x-dropdown"></div>');
            var dopDownDivIn = $('<div class="x-dropdownIn"></div>')
        }
        for (var i = 0; i < this.menuList.length; i++){
            var menu = this.menuList[i];
            var dopDownUl = $('<ul class="my-dropdown"></ul>')
            if (menu.title) {
                $('<h3 style="font-size:15px; padding:20px 10px 5px 10px; color:#555; font-weight:400;">' + menu.title + '</h3>').appendTo(dopDownUl);
            }
            menu.items.forEach(function(item) {
                $('<li>&nbsp;&nbsp;&nbsp;' + item.name + '</li>').appendTo(dopDownUl);
            });
            if(this.direction == 'x'){
                dopDownUl.appendTo(dopDownDivIn);
                dopDownDivIn.appendTo(dopDownDiv);
                dopDownDiv.appendTo($(this.wrap));
            }else{
                dopDownUl.appendTo($(this.wrap));
            }
        }
    }
    
    Dropdown.prototype.initStyle = function () {
        $('.dropdown-btn').css({
            fontWeight: 600,
            color: '#777'
        });
        var width = this.width;
        $(this.wrap).css({
            position: 'relative',
            height: '30px',
            marginLeft: '12px'
        }).find('.my-dropdown').css({
            position: 'absolute',
            backgroundColor: '#fff',
            border: '1px solid #eee',
            display: 'none',
            zIndex: 100,
            overflow: 'hidden',
            borderTop: '3px solid #004094',
            borderBottom: '2px solid #004094',
            marginTop: '8px'
        }).find('li').css({
        //    position: 'absolute',
           width: width,
           float: 'left',
           textAlign: 'left',
           cursor: 'pointer',
           whiteSpace: 'nowrap',
           height: '31.4px',
           lineHeight: '31.4px',
           borderBottom: '1px solid #eee',
           fontSize: '13px',
           fontWeight: '400',
           color: '#687074'
        });
        if (this.direction == 'x') {
            $('.x-dropdown', $(this.wrap)).css({

                // float: 'left',
                width: 1348,
                // height: 605,
                right: -555,
                // margin: '0 auto',
                backgroundColor: '#fff',
                display: 'none',
                marginTop: '8px',
                position: 'absolute',
                borderTop: '3px solid #004094',
                borderBottom: '2px solid #004094'
            }).find('.x-dropdownIn').css({
                width: 1176,
                height: 588,
                // backgroundColor: '#555',
                margin: '0 auto'
            }).find('.my-dropdown').css({
                float: 'left',
                width: 292,
                height: 565,
                borderTop: '0px solid #004094',
                // borderBottom: '0px solid #004094',
                marginTop: 0,
                position: 'relative'
            }).find('li').css({
                width: 292,
                height: 30,
                borderBottom: '0px solid #eee'
            });
        }
    }
    Dropdown.prototype.bindEvent = function() {
        // var self = this;
        $('.dropdown-btn').hover(function() {
           $(this).css({
               fontWeight: 600,
               color: '#004094'
           })
        }, function() {
            $(this).css({
                color: '#004094',
                fontWeight: '600',
                
            })
        });
        $(this.wrap).hover(function() {
            $(this).find('.dropdown-btn').css({
                backgroundColor: '#fff',
                borderColor: '#eee',
                borderBottomColor: '#fff',
            });
            $('.x-dropdown', $(this)).show();
            
            $('.my-dropdown', $(this)).show();
        }, function() {
            $(this).find('.dropdown-btn').css({
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderBottomColor: 'transparent',
                color: '#777',
                fontWeight: '600'
            });
            $('.x-dropdown', $(this)).hide();
            $('.my-dropdown', $(this)).hide();
        });
        $('.my-dropdown > li').hover(function() {
            $(this).css({
                color: '#fff',
                backgroundColor: '#687074'
            })
        }, function() {
            $(this).css({
                color: '#687074',
                backgroundColor: '#fff'
            })
        })

    }


    $.fn.extend({
        addDropdown: function(options) {
            options.wrap = this || $('body');
            new Dropdown(options);
            return this;
        }
    });
} ())