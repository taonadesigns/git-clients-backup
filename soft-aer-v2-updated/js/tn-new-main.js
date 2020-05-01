function showLoader() {
    $(".tn-loader").css("display", "block");
}

function hideLoader() {
    $(".tn-loader").css("display", "none");
}

//DOWNLOAD FILE
function downloadFile() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File are not fully supported in this browser.');
        return;
    }

    input = document.getElementsByName('myFile');
    if (!input) {
        alert("Couldn't find the fileinput element.");
    } else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    } else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    } else {
        file = input.files[0];
        fr = new FileReader();
        fr.readAsDataURL(file);

        var blob = new Blob([file], { type: "application/pdf" }); // change resultByte to bytes

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "myFileName.pdf";
        link.click();
    }
}

//SPACE BETWEEN DIGITS FOR INTEGER
(function($, undefined) {

    "use strict";

    // When ready.
    $(function() {

        var $form = $("body");
        var $input = $form.find(".tn-number-only, .currency");

        $input.on("keyup", function(event) {


            // When user select text in the document, also abort.
            var selection = window.getSelection().toString();
            if (selection !== '') {
                return;
            }

            // When the arrow keys are pressed, abort.
            if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
                return;
            }


            var $this = $(this);

            // Get the value.
            var input = $this.val();

            input = input.replace(/[\D\s\._\-]+/g, "");
            input = input ? parseInt(input, 10) : 0;

            $this.val(function() {
                return (input === 0) ? "" : input.toLocaleString("fr-FR");
            });
        });
    });
})(jQuery);

//SORT SUBGRID
function SortSubgrigTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("mySubGrid");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//SORT TABLE
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 3); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//FILTER WITH DROPDOWN
function filterFunction() {
    var textboxInput, filter, ul, li, a, i;
    textboxInput = document.getElementsByClassName(".ctrl-lookup");
    filter = textboxInput.value.toUpperCase();
    div = document.getElementById("lookupItemList");
    a = div.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

$(document).ready(function() {

    checkNumberOfRows();
    checkNumberOfTableRows();

    //MAKE FIRST ITEM VISIBLE FROM NAVIGATION DROPDOWN
    FirstItemToBeVisibleFromNavigationDropdown();

    //VALIDATION FOR MAXIMUM NUMBER
    function CheckMaximunInput(thisObj, _tnMaximumNumberOfCharacters, message) {
        var objectLength = thisObj.val().length;

        if (objectLength > _tnMaximumNumberOfCharacters) {

            //DISPLAY ERROR IF IT DOESNT EXIST
            if (thisObj.siblings('.msg-error').length) {} else {
                if (message !== '') {
                    //DISPLAY MESSAGE THAT WAS SET
                    thisObj.after("<label class='msg-error'>" + message + "</label>");
                } else {
                    //DISPLAY DEFAULT MESSAGE IF MESSAGE NOT SET
                    thisObj.after("<label class='msg-error'>Input should be less than " + _tnMaximumNumberOfCharacters + " characters</label>");
                }
            }
        } else {
            thisObj.nextAll('label.msg-error').remove();
        }
    }

    //VALIDATION FOR MINIMUM NUMBER
    function CheckMinimumInput(thisObj, _tnMinimumNumberOfCharacters, message) {
        var objectLength = thisObj.val().length;

        if (objectLength < _tnMinimumNumberOfCharacters) {
            //DISPLAY ERROR IF ERROR DOESNT EXIST
            if (thisObj.siblings('.msg-error').length) {} else {
                if (message !== '') {
                    //DISPLAY MESSAGE THAT WAS SET
                    thisObj.after("<label class='msg-error'>" + message + "</label>");
                } else {
                    //DISPLAY DEFAULT MESSAGE IF MESSAGE NOT SET
                    thisObj.after("<label class='msg-error'>Input should be more than " + _tnMinimumNumberOfCharacters + " characters</label>");
                }
            }
        } else {
            thisObj.nextAll('label.msg-error').remove();
        }
    }

    //VALIDATION FOR EMAIL
    function CheckEmailInput(thisObj, message) {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

        if (testEmail.test(thisObj.val())) {
            thisObj.nextAll('label.msg-error').remove();
        } else {
            if (thisObj.siblings('.msg-error').length) {} else {
                if (message !== '') {
                    //DISPLAY MESSAGE THAT WAS SET
                    thisObj.after("<label class='msg-error'>" + message + "</label>");
                } else {
                    //DISPLAY DEFAULT MESSAGE IF MESSAGE NOT SET
                    thisObj.after("<label class='msg-error'>Invalid email address</label>");
                }
            }
        }
    }


    $('body').find('input, textarea').each(function() {
        $(this).on('input', function() {

            var tnMaximumNumberOfCharacters = $(this).data('xrm-max');
            var tnMinimumNumberOfCharacters = $(this).data('xrm-min');
            var tnMailAttribute = $(this).data('xrm-mail');

            if ((typeof tnMaximumNumberOfCharacters !== 'undefined') && (tnMaximumNumberOfCharacters !== "")) {
                CheckMaximunInput($(this), tnMaximumNumberOfCharacters, "");
            } else if ((typeof tnMinimumNumberOfCharacters !== 'undefined') && (tnMinimumNumberOfCharacters !== "")) {
                CheckMinimumInput($(this), tnMinimumNumberOfCharacters, "");
            } else if ((typeof tnMailAttribute !== 'undefined') && (tnMailAttribute === true)) {
                CheckEmailInput($(this), "");
            }
        });
    });

    //QUICK CREATE MODAL
    var modalQuickCreate = function(callback) {

        $('a[name="btnQuickAddBox"]').on('click', function(e) {
            $(".tnQuickAddBox").modal({
                backdrop: 'static',
                keyboard: false
            });
        });

        $('button[name="quick-add-save"]').on("click", function() {
            callback(true);
            $(".tnQuickAddBox").modal('hide');
        });

        $('button[name="quick-add-cancel"]').on("click", function() {
            callback(false);
            $(".tnQuickAddBox").modal('hide');
        });
    };

    modalQuickCreate(function(confirm) {
        if (confirm) {
            console.log("Save");
        } else {
            console.log("Cancel");
        }
    });

    //--------------------------------------------------------------------

    //PUT TWO DECIMAL AFTER THE DOT AND DECIMAL
    $('input[name="textboxDecimal"]').blur(function() {
        var inputtedNumber = parseFloat($(this).val());
        var formattedNumber = inputtedNumber.toFixed(2);
        $(this).val(formattedNumber);
    });
    //-----------------------------------------------------------------


    //PUT TWO DECIMAL AFTER THE DOT ON CURRENCY
    $('input[name="textboxCurrency"]').blur(function() {
        var inputtedNumber = parseFloat($(this).val());
        var formattedNumber = inputtedNumber.toFixed(2);
        $(this).val(formattedNumber);
    });
    //-----------------------------------------------------------------


    //CLICKING ON SAVE TO VALIDATE

    function isRequiredFieldValid() {
        var tabIndex = 0;
        var tabIndexList = [];
        // var tabIndexListUnique = [];
        var tabIDList = [];
        var isValidList = [];

        //LOOP THROUGH EVERY TAB
        $('body').find(".tab-pane").each(function(index, element) {

            //GET EACH TAB ID AND PUT IT IN A LIST
            tabIDList.push($(this).attr('id'));

            $(this).find('input, textarea, .dropdownSelectItem').each(function() {
                if ((typeof $(this).data('require') !== 'undefined') && ($(this).data('require') === true)) {
                    if ($(this).get(0).type === 'checkbox' && $(this).is(":checked") === false) {
                        $(this).parent().css("border", "0.1px solid red");
                        isValidList.push(false);

                        //for testing only
                        console.log(getValue(this));
                    } else if ($(this).get(0).type === 'checkbox' && $(this).is(":checked") === true) {
                        isValidList.push(true);
                        $(this).parent().css("border", "none");

                        //for testing only
                        console.log(getValue(this));
                    } else if ($(this).val() === "") {

                        //GETTING THE ID OF THE TAB THAT HAS EMPTY FIELD
                        tabIndexList.push(index);

                        $(this).css("border-color", "red");
                        // $(this).closest('div.tab-pane').css("background-color", "green");
                        //DROPDOWN BORDER REQUIRED
                        if ($(this).hasClass('dropdownSelectItem')) {
                            $(this).parent().css("border-color", "red");
                        }
                        isValidList.push(false);
                    } else {
                        $(this).css("border-color", "#ddd");
                        isValidList.push(true);

                        //for testing only
                        console.log(getValue(this));
                    }
                }
            });
        });

        if (isValidList.indexOf(false) > -1) {
            return false;
        } else {
            return true;
        }
    }

    $('button[name="tnBtnActionSave"]').on('click', function(e) {
        // showLoader();
        var tabIndex = 0;
        var tabIndexList = [];
        // var tabIndexListUnique = [];
        var tabIDList = [];

        if (isRequiredFieldValid()) {
            alert("all fields are valid");
        } else {
            alert("some fields are not valid");
        }

        //REMOVE DUPICATE FROM THE INDEX LIST
        var tabIndexListUnique = tabIndexList.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });

        //GET THE MINIMUM INDEX
        tabIndex = Math.min.apply(Math, tabIndexListUnique);

        //SHOW THE LOWEST TAB WITH THE EMPTY FIELD
        $('a[href="#' + tabIDList[tabIndex] + '"]').tab('show');


        //LOADER TIMEOUT FOR DEMO PURPOSE
        setTimeout(function() { hideLoader(); }, 3000);
    });
    //------------------------------------------------------------------

    $('body').find('input, textarea').each(function() {

        //CHECK IF TEXTBOX HAS DATA-REQUIRE ATTRIBUTE AND IF THE ATTRIBUTE IS TRUE, THEN CHECK IF ITS EMPTY
        if ((typeof $(this).data('require') !== 'undefined') && ($(this).data('require') === true)) {
            if ($(this).val() === "") {
                $(this).parent('div').siblings('div:first-child').addClass('tn-asterix');
            } else {

            }

            //REMOVE THE ASTERIX AS THE USER WRITE
            // $(this).on('input', function() {
            //     if($(this).val().length) {
            //         $(this).parent('div').siblings('div:first-child').removeClass('tn-asterix');
            //     } else {
            //         $(this).parent('div').siblings('div:first-child').addClass('tn-asterix');
            //     }
            // });

        } else if (typeof $(this).data('xrm-max') !== 'undefined') {
            $(this).css('border-color', 'green');
        }

    });

    //------------------------------------------------------------------

    //CLICKING ON IMPORT
    $('button[name="tnBtnActionImport"]').on('click', function(e) {

        ShowImportModal();

        function ShowImportModal() {
            $(".tnImportModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });

    //------------------------------------------------------------------

    //CLICKING ON EXPORT
    $('button[name="tnBtnActionExport"]').on('click', function(e) {

        ShowExportModal();

        function ShowExportModal() {
            $(".tnExportModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
    //------------------------------------------------------------------

    //SET VALUE TO MESSAGE BOX
    $('button[name="tnBtnShowModal"]').on('click', function(e) {

        ClearMessageBoxVariable();

        var titleToBeUsedInMessageBox = $('#messageBoxTitle').val();
        var contentToBeUsedInMessageBox = $('#messageBoxContent').val();
        var messageBoxDefaultTitle = "Message Box Title";
        var messageBoxDefaultContent = "Message Box Content";

        if ((titleToBeUsedInMessageBox === "") && (contentToBeUsedInMessageBox === "")) {
            $('#tnMessageBoxTitle').text(messageBoxDefaultTitle);
            $('#tnMessageBoxBody').text(messageBoxDefaultContent);
            ShowMessageBox();
        } else if ((titleToBeUsedInMessageBox === "") && (contentToBeUsedInMessageBox !== "")) {
            $('#tnMessageBoxTitle').text(messageBoxDefaultTitle);
            $('#tnMessageBoxBody').text(contentToBeUsedInMessageBox);
            ShowMessageBox();
        } else if ((titleToBeUsedInMessageBox !== "") && (contentToBeUsedInMessageBox === "")) {
            $('#tnMessageBoxTitle').text(titleToBeUsedInMessageBox);
            $('#tnMessageBoxBody').text(messageBoxDefaultContent);
            ShowMessageBox();
        } else if ((titleToBeUsedInMessageBox !== "") && (contentToBeUsedInMessageBox !== "")) {
            $('#tnMessageBoxTitle').text(titleToBeUsedInMessageBox);
            $('#tnMessageBoxBody').text(contentToBeUsedInMessageBox);
            ShowMessageBox();
        }

        function ClearMessageBoxVariable() {
            titleToBeUsedInMessageBox = "";
            contentToBeUsedInMessageBox = "";
        }

        function ShowMessageBox() {
            $("#tnMessageBox").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
    //------------------------------------------------------------------

    //SET VALUE TO MESSAGE BOX
    $('button[name="tnBtnShowPopup"]').on('click', function(e) {

        ClearPopupVariable();

        var popupContentToBeUsed = $('#txtPopupContent').val();
        var popupDefaultContent = "Popup content";

        if (popupContentToBeUsed === "") {
            $('#tnPopupContent').text(popupDefaultContent);
            ShowPopup();
        } else {
            $('#tnPopupContent').text(popupContentToBeUsed);
            ShowPopup();
        }

        function ClearPopupVariable() {
            popupContentToBeUsed = "";
        }

        function ShowPopup() {
            $("#tnPopUp").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });

    //------------------------------------------------------------------

    //CONFIRMATION MODAL
    var modalConfirm = function(callback) {

        $('button[name="confirm"]').on('click', function(e) {
            $("#tnModalConfirmation").modal({
                backdrop: 'static',
                keyboard: false
            });
        });

        $('button[name="modal-btn-yes"]').on("click", function() {
            callback(true);
            $("#tnModalConfirmation").modal('hide');
        });

        $('button[name="modal-btn-no"]').on("click", function() {
            callback(false);
            $("#tnModalConfirmation").modal('hide');
        });
    };

    modalConfirm(function(confirm) {
        if (confirm) {
            console.log("Yes");
        } else {
            console.log("No");
        }
    });

    //--------------------------------------------------------------------

    //Clicking dropdown field and show the clicked item
    // $('.dropdown.mydropdown a').click(function() {
    //     var itemSelected = $(this).text();
    //     $('span.dropdownSelectItem').text(itemSelected);
    //     console.log(getDrpdownSelectedItem(this));
    // });

    //--------------------------------------------------------------------

    //DISPLAY THE FIRST ITEM FROM THE NAVIGATION DROPDOWN
    function FirstItemToBeVisibleFromNavigationDropdown() {
        $(".navbar-center .dropdown.ddLastModuleVisited ul.dropdown-menu li a").click(function() {
            var selText = $(this).text();

            $(this).parents('.dropdown').find('.dropdown-toggle').html('<span id="selected">' + selText + ' </span><span class="caret"></span>');
            $(this).parents('.dropdown').find('.dropdown-toggle').html('<span id="selectedMobile">' + selText + ' </span><span class="caret"></span>');

            //----------

            $("div.mega-dropdown-menu.tn-quick-module-link-container div.tn-submenu-title").each(function(index) {

                var item = $(this).attr("id");

                selText = selText.replace(/\s/g, '');

                if (item === selText) {

                    $('div.mega-dropdown-menu.tn-quick-module-link-container').css('display', 'none');
                    $('div.mega-dropdown-menu.tn-quick-module-link-container .tn-submenu-title').css('display', 'none');


                    $('div.mega-dropdown-menu.tn-quick-module-link-container').css('display', 'block');
                    $(this).css('display', 'block');


                }
            });

            //=============

        });
        //trigger event
        $('.navbar-center .dropdown.ddLastModuleVisited ul.dropdown-menu li a').first().trigger('click');

    }

    //--------------------------------------------------------------------

    // HANDLING NO RECORD
    function checkNumberOfTableRows() {
        $('.noRecord').css("display", "none");

        var rowCount = $('#myTable tbody tr:visible').length;
        if (rowCount === 0) {
            $('#myTable > tbody:last-child').append('<tr class="noRecord"><td>No records to display</td></td>').append('<tr class="noRecord"><td>No records to display</td></td>');
        } else {
            $('.noRecord').css("display", "none");

        }
    }
    // --------------------------------------------------------------------

    //MAKE FIRST DROPDOWN ITEM VISIBLE FROM LISTING
    FirstItemToBeVisibleFromListingDropdown();

    function FirstItemToBeVisibleFromListingDropdown() {
        $(".tn-listing-dropdown .dropdown ul.dropdown-menu li a").click(function() {
            var selText = $(this).text();
            $(this).parents('.dropdown').find('.dropdown-toggle').html('<i class="far fa-user fa-fw"></i> <span id="selectedOption">' + selText + ' </span><span class="caret"></span>');
        });
        //trigger event
        $('.tn-listing-dropdown .dropdown ul.dropdown-menu li a').first().trigger('click');
    }

    // --------------------------------------------------------------------

    // Add slideDown animation to current module dropdown when expanding.
    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // Add slideUp animation to current module dropdown when collapsing.
    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    // --------------------------------------------------------------------

    // HOVER ON FIXED LINKS
    $("div.tn-quick-module-link-container .tn-submenu-title ul li").hover(
        function() {
            $(this).addClass('animated ' + 'pulse');
        },
        function() {
            $(this).removeClass('animated ' + 'pulse');
        }
    );

    // --------------------------------------------------------------------

    //SELECT ALL CHECKBOXES FROM SUBGRID
    $('input[name="selectAllSubgridRow"]').click(function(e) {
        var checked = $(this).is(':checked'); // Checkbox state

        //SELECT * CHECKBOXES
        if (checked) {
            $(this).closest('table').find('td input:checkbox').prop('checked', this.checked).closest('tr').addClass("subgrid-highlight");
        } else {
            $(this).closest('table').find('td input:checkbox').prop('checked', false).closest('tr').removeClass("subgrid-highlight");
        }
    });

    // --------------------------------------------------------------------

    //SELECT ROW AND HIGHLIGHT
    $("input[type='checkbox']").change(function(e) {
        if ($(this).is(":checked")) { //If the checkbox is checked
            $(this).closest('tbody tr').addClass("subgrid-highlight");
            //Add class on checkbox checked
        } else {
            $(this).closest('tbody tr').removeClass("subgrid-highlight");
            //Remove class on checkbox uncheck
        }
    });

    // --------------------------------------------------------------------

    //CLICKING AND DELETE ROW
    $('a[name="btnDeleteRow"]').on('click', function(e) {
        $('table tr').has('input[name="checkSubgrid"]:checked').remove();
    });


    // DELETE SELECTED ROW
    $("#btnDeleteRow").on("click", function() {
        $('table tr').has('input[name="checkSubgrid"]:checked').remove();
    });

    // --------------------------------------------------------------------

    //ALWAYS SHOW 6 ROWS BY DEFAULT
    function makeTableScroll() {
        // Constant retrieved from server-side via JSP
        var maxRows = 7;

        var table = document.getElementById('mySubGrid');
        var wrapper = table.parentNode;
        var rowsInTable = table.rows.length;
        var height = 0;
        if (rowsInTable > maxRows) {
            for (var i = 0; i < maxRows; i++) {
                height += table.rows[i].clientHeight;
            }
            wrapper.style.height = height + "px";
        }
    }

    // --------------------------------------------------------------------

    $(function() {

        $("ul li.dropdown.ddLastModuleVisited.disabled a").click(function() {
            // return false;
        });

        //Clicking list of module dropdown
        $('.dropdown.ddLastModuleVisited a').click(function() {

            var moduleSelected = $(this).text();
            $('#selected').text(moduleSelected);


            $("div.mega-dropdown-menu.tn-quick-module-link-container div.tn-submenu-title").each(function(index) {

                var item = $(this).attr("id");

                moduleSelected = moduleSelected.replace(/\s/g, '');

                if (item === moduleSelected) {

                    $('div.mega-dropdown-menu.tn-quick-module-link-container').css('display', 'none');
                    $('div.mega-dropdown-menu.tn-quick-module-link-container .tn-submenu-title').css('display', 'none');


                    $('div.mega-dropdown-menu.tn-quick-module-link-container').css('display', 'block');
                    $(this).css('display', 'block');

                }
            });
        });
    });

    // --------------------------------------------------------------------

    function removeScrolling() {
        // lock scroll position, but retain settings for later
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
        html.data('scroll-position', scrollPosition);
        html.data('previous-overflow', html.css('overflow'));
        html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
    }

    removeScrolling();

    // DOUBLE CLICK ON TABLE ROW AND REDIRECT
    $('.tn-listing-table tbody tr').dblclick(function() {
        window.location.href = "forms.html";
    });

    // FILTER
    $(".tn-table-footer-sorting .tn-table-footer-sorting-links").click(function() {

        var current = $(this).text();

        $(".tn-table-footer-sorting .tn-table-footer-sorting-links").css('background-color', '#aeb1b2');
        // $(".tn-table-footer-sorting .tn-table-footer-sorting-links").css('border-bottom', '#eae8e8');

        $(this).css('background-color', '#4a494e');
        $(this).css('color', '#ffffff');

        if (current !== 'All') {

            $("#myTable tbody tr").each(function() {

                if ($(this).find("td:nth-child(3)").text().indexOf(current) === 0) {
                    $("#do-not-delete-this-row").css('display', 'block');

                    $(this).closest('tr').show();


                } else {
                    $(this).closest('tr').hide();
                }
            });
        } else {
            $("#myTable tbody tr").show();
        }
        checkNumberOfTableRows();
    });

    //SELECT ROW AND HIGHLIGHT
    $("input[type='checkbox']").change(function(e) {
        if ($(this).is(":checked")) { //If the checkbox is checked
            $(this).closest('tr').addClass("highlight");
            //Add class on checkbox checked
        } else {
            $(this).closest('tr').removeClass("highlight");
            //Remove class on checkbox uncheck
        }
    });

    //SELECT ALL CHECKBOXES
    $('#selectAll').click(function(e) {
        var checked = $(this).is(':checked'); // Checkbox state

        //SELECT * CHECKBOXES
        if (checked) {
            $(this).closest('table').find('td input:checkbox').prop('checked', this.checked).closest('tr').addClass("highlight");
        } else {
            $(this).closest('table').find('td input:checkbox').prop('checked', false).closest('tr').removeClass("highlight");
        }
    });



    //DISPLAY AND HIDE THE FILTER LETTERS
    $("#btnSortingBar").click(function() {

        if ($('.tn-table-footer-sorting-links').css('display') === 'none') {
            $('.tn-table-footer-sorting-links').attr('style', 'display: block !important');

        } else {
            $('.tn-table-footer-sorting-links').attr('style', 'display: none !important');
        }
    });

    // --------------------------------------------------------------------

    //CLEAR SEARCH TEXTBOX ON BACKSPACE PRESS
    var input = $('.ctrl-lookup');
    input.on('keydown', function() {
        var key = event.keyCode || event.charCode || event.key || event.which;

        if (key === 8 || key === 46) {
            $(this).val('');
        }
    });

    // --------------------------------------------------------------------

    //REDIRECT WHEN YOU CLICK ON THE LOOKUP
    $('button[name="btnLookupGoTo"]').on('click', function(e) {
        var selectedItem = $('.tn-scrollable-dropdown-container input.tn-scrollable-dropdown-button').val();

        var url = "form-detail.html?item=" + selectedItem + "&id=1";
        window.location.href = url;
    });

    // --------------------------------------------------------------------

    // HANDLING NO RECORD
    function checkNumberOfRows() {
        $('.noRecord').css("display", "none");

        var rowCount = $('#mySubGrid tbody tr:visible').length;
        if (rowCount === 0) {
            $('#mySubGrid > tbody:last-child').append('<tr class="noRecord"><td>No records</td></td>');
        } else {
            $('.noRecord').css("display", "none");

        }
    }

    // --------------------------------------------------------------------

    // FILTER
    $(".tn-subgrid-filter-footer .pagination .tn-subgrid-footer-sorting-links").click(function() {

        var current = $(this).text();

        $(".tn-subgrid-filter-footer .pagination .tn-subgrid-footer-sorting-links").css('background-color', '#aeb1b2');
        $(this).css('background-color', '#FBCA56');

        if (current !== 'All') {

            $("#mySubGrid tbody tr").each(function() {

                if ($(this).find("td:nth-child(3)").text().indexOf(current) === 0) {
                    $(this).closest('tr').show();


                } else {
                    $(this).closest('tr').hide();
                }
            });
        } else {
            $("#mySubGrid tbody tr").show();
        }
        checkNumberOfRows();
    });

    // --------------------------------------------------------------------

    //DISPLAY AND HIDE THE FILTER LETTERS
    $("#btnSortingSubgrid").click(function() {

        if ($('.tn-subgrid-footer-sorting-links').css('display') === 'none') {
            $('.tn-subgrid-footer-sorting-links').attr('style', 'display: inline !important');

        } else {
            $('.tn-subgrid-footer-sorting-links').attr('style', 'display: none !important');
        }
    });
    // --------------------------------------------------------------------

    //ONLY ACCEPT INTEGERS
    $(".tn-number-only").keypress(function(e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Digits Only").show().fadeOut("slow");
            return false;
        }
    });

    // --------------------------------------------------------------------



    //GET DROPDOWN & LOOK UP SELECTED ITEM AND SELECTED VALUE
    $('ul.dropdown-menu.ctrl-dropdown li a, ul.ctrl-lookup-list li').click(function() {
        var itemSelected = $(this).text();
        var valueSelected = $(this).data('dropdown-value');

        alert("you selected " + itemSelected + " and the value is " + valueSelected)
    });

    // --------------------------------------------------------------------

    //CLICK ON PANEL ICON WHEN COLLAPSING
    $(".panel-heading span.clickable").click(function() {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });

    $(".nav-tabs a").click(function() {
        $(this).tab('show');
    });

    // --------------------------------------------------------------------
    // // RETURNS THE VALUE OF THE SELECTED ITEM ON THE DROPDOWN
    function getDrpdownSelectedItem(control) {
        return $(control).text();
    }
    // --------------------------------------------------------------------



    // //DISABLE ELEMENT/FIELD USING DATA ATTRIBUTES
    function disableFieldByAttribute() {

        //LOOP THROUGH EVERY TAB
        $('body').find(".tab-pane").each(function(index, element) {

            $(this).find('input, textarea, .dropdownSelectItem').each(function() {
                if ((typeof $(this).data('disable') !== 'undefined') && ($(this).data('disable') === true)) {
                    $(this).prop('disabled', true);
                }
            });
        });
    }
    //

    // //DISABLE ELEMENT/FIELD USING DATA PROPERTIES
    function disableFieldByProperty(elem) {
        $(elem).prop('disabled', true);
    }


    $('button[name="btnEnableDrop"]').on('click', function(e) {
        $('body').find(".tab-pane").each(function(index, element) {
            $(this).find("[data-name='dropdown']").data('disable', false);
            $(this).find("[data-name='dropdown']").css('pointerEvents', 'auto');
            $(this).find("[data-name='dropdown']").find(".dropdown-toggle").removeClass('disableDropdown');

        });
    });

    $('button[name="btnDisableInput"]').on('click', function(e) {

        $('body').find(".tab-pane").each(function(index, element) {
            $(this).find('input, textarea, .dropdownSelectItem').each(function() {
                $(this).data('disable', true);
                $(this).prop('disabled', true);
            });

        });
    });
    $('button[name="btnEnableInput"]').on('click', function(e) {
        $('body').find(".tab-pane").each(function(index, element) {
            $(this).find('input, textarea, .dropdownSelectItem').each(function() {
                $(this).data('disable', false);
                $(this).prop('disabled', false);
            });

        });
    });

    //ENABLE ELEMENT/FIELD USING DATA ATTRIBUTES
    function enableFieldByAttribute(elem) {
        elem.setAttribute('data-disabled', false);
    }

    //ENABLE ELEMENT/FIELD USING DATA PROPERTIES
    function enableFieldByProperty(elem) {
        $(elem).prop('disabled', false);
    }

    function getAllValues() {
        var data = [];
        $('body').find(".tab-pane").each(function(index, element) {

            $(this).find('input, textarea, .dropdownSelectItem').each(function() {
                //WHEN INPUTS ARE VALID PUSH TO DATA ARRAY
                data.push([$(this)[0].name, $(this).val()]);
            });

        });
        return data;
    }

    function getValue(elem) {
        if ($(elem).get(0).type === 'checkbox') {
            return $(elem).is(":checked");
        }
        return $(elem).val();
    }

    function getValueByAttribute(elem) {
        return $(elem).data("data-value");
    }

    function setValue(elem, value) {
        $(elem).val(value);
    }

    function setValueByAttribute(elem, value) {
        elem.setAttribute('data-value', value);
    }
});