/**
 * Created by Michael R. Johnston on 12/10/13.
 */

Scrapy.utils = {

    generateRandomInt: function generateRandomInteger(minNumber, maxNumber, minDigits, maxDigits) {
        var num, digits;
        do {
            num = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
            digits = Math.abs(num).toString().length;
        } while (digits > maxDigits || digits < minDigits);
        return num;
    },

    getShortDate: function(date){
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + (date.getDate()) ;
        var y = date.getFullYear();

        // Pad month/year with leading zeros
        m = m.slice(-2);
        d = d.slice(-2);
        return y + '-' + m + '-' + d;
    },



    getShortDateTime: function(date){
        var d = this.getShortDate(date);

        var h = '0' + date.getHours();
        var m = '0' + date.getMinutes();

        h = h.slice(-2);
        m = m.slice(-2);
        return d + ' ' + h + ':' + m;
    },

        /**
     * Display a view within a region, adding jQuery fadeIn effect
     * @param region
     * @param view
     */
    fadeInRegion: function(region,view){
        $('#main-container').hide();
        region.show(view);
        $('#main-container').fadeIn('slow');
    },

    /*
     * Pad a number with a leading zero if less than 10
     */
    pad: function(n) {
        return (n < 10) ? ("0" + n) : n;
    },


    /**
     * Displays a Bootstrap confirmation modal dialog box
     * @param {object} options
     */
    showConfirmModal: function (options) {
        if(options.yesButtonText){
            $('#confirmModal').find('#yesButton').html(options.yesButtonText);
        } else {
            $('#confirmModal').find('#yesButton').html('Ok');
        }
        if(options.noButtonText){
            $('#confirmModal').find('#noButton').html(options.noButtonText);
        } else {
            $('#confirmModal').find('#noButton').html('Cancel');
        }
        $('#confirmModal').find('.modal-header').html(options.header);
        $('#confirmModal').find('.modal-body').html(options.body);
        $('#confirmModal').modal('show');
        $('#yesButton').click(function () {
            $('#confirmModal').modal('hide');
            $('#yesButton').off();
            $('#noButton').off();
            if (options.yesCallback != undefined) options.yesCallback();
        });
        $('#noButton').click(function () {
            $('#confirmModal').modal('hide');
            $('#yesButton').off();
            $('#noButton').off();
            if (options.noCallback !== undefined) options.noCallback();
        })
    },


    /**
     * Displays a Bootstrap confirmation modal
     */
    showInfoModal: function (options) {
        if ((options.header === undefined) || (options.body === undefined)) return;
        $('#infoModal').find('.modal-header').html(options.header);
        $('#infoModal').find('.modal-body').html(options.body);
        $('#infoModal').modal('show');
        $('#dismissButton').click(function () {
            $('#infoModal').modal('hide');
            $('#dismissButton').off();
            if (options.callback != undefined) callback();
        });
    },

    timeElapsed: function(start, end){
        var msec = end - start;
        var hh =  + Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        var HH = ('00' + hh).slice(-2);
        var MM = ('00' + mm).slice(-2);
        var SS = ('00' + ss).slice(-2);
        return HH + ':' + MM + ':' + SS;
    }
};
