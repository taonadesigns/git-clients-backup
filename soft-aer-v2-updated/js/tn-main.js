$(document).ready(function() {


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

    // SET INITIAL IN THE WHITE CIRCLE
    $(function() {

        var fullname = $("#fullname").text();
        var parts = fullname.split(' ');
        var firstname = parts[0].charAt(0);
        var surname = parts[1].charAt(0);

        $("#fullname").attr('data-letters', firstname + "" + surname);
    });

    // SET INITIAL IN THE WHITE CIRCLE
    $(function() {

        var formName = $("#formName").text();
        var parts = formName.split(' ');
        var partOne = parts[0].charAt(0);
        var partTwo = parts[1].charAt(0);

        $("#formName").attr('data-form', partOne + "" + partTwo);
    });

    // SET INITIAL IN THE WHITE CIRCLE FOR DROPDOWN
    $(function() {

        $('.tn-scrollable-dropdown .dropdown-inside-icon').each(function(index) {
            var dropdownName = $(this).text();
            var parts = dropdownName.split(' ');
            var partOne = parts[0].charAt(0);
            var partTwo = parts[1].charAt(0);

            var test = index;

            $(this).attr('data-dropdown', partOne + "" + partTwo);
        });

        // var dropdownName = $(".dropdown-inside-icon").text();
        // var parts = dropdownName.split(' ');
        // var partOne = parts[0].charAt(0);
        // var partTwo = parts[1].charAt(0);
        //
        // $(".dropdown-inside-icon").attr('data-dropdown', partOne + "" + partTwo);
    });


    // Closing menu by clicking outside
    $(function() {

        var $win = $(window); // or $box parent container
        var $box = $("nav");

        $win.on("click.Bst", function(event) {
            if (
                $box.has(event.target).length === 0 //checks if descendants of $box was clicked
                &&
                !$box.is(event.target) //checks if the $box itself was clicked
            ) {
                // console.log("you clicked outside the box");
                $('div.collapse.navbar-collapse.tn-navbar-collapse').removeClass('in');
                $('.collapse div.dropdown-menu.mega-dropdown-menu').slideUp("400");
            } else {
                // console.log("you clicked inside the box");
            }
        });

    });

    // Clicking on the last module visited
    $(".btnLastModuleVisited").click(function() {
        if (($('.collapse div.dropdown-menu.mega-dropdown-menu').css('display') === 'none') || ($('div.collapse.navbar-collapse.tn-navbar-collapse').css('display') === 'none')) {

            isExpanded();

            $("div.tn-navbar-collapse div.dropdown-menu.mega-dropdown-menu li a.tn-submenu").each(function(index) {

                if ($('a.btnLastModuleVisited:first').text() === $(this).text()) {

                    $('div.collapse.navbar-collapse.tn-navbar-collapse').addClass('in');
                    $('.tn-submenu-links-container ul').css('display', 'block');

                    $("ul.tn-submenu-links").hide();
                    $(this).siblings('ul').slideDown("400");

                }
            });
        } else {
            $('div.collapse.navbar-collapse.tn-navbar-collapse').removeClass('in');
            $('.collapse div.dropdown-menu.mega-dropdown-menu').slideUp("400");
        }
    });

    // Clicking on one module
    $(".dropdown-menu.mega-dropdown-menu .tn-submenu-title a.tn-submenu").click(function() {

        var moduleClicked = $(this).text();
        var moduleDivClicked = $(this);

        $("div.tn-submenu-links-container ul.dropdown-menu.mega-dropdown-menu li a.tn-submenu").each(function(index) {

            if (moduleClicked === $(this).text()) {
                if ($(this).siblings('ul').css('display') === 'none') {
                    $('.tn-submenu-links-container ul').css('display', 'block');
                    $("ul.tn-submenu-links").hide();
                    $('.tn-submenu').removeClass('active');

                    $(this).siblings('ul').slideDown("400");

                    $(moduleDivClicked).addClass('active');
                } else {
                    $(this).siblings('ul').slideUp("400");
                    $('.tn-submenu-links-container ul').css('display', 'none');
                    $('.tn-submenu').removeClass('active');
                }
            }
        });
    });

    function isExpanded() {
        if ($('.navbar-collapse').attr('aria-expanded') === true) {
            $('div.dropdown-menu.mega-dropdown-menu').css('display', 'none');
        } else {
            $('div.dropdown-menu.mega-dropdown-menu').css('display', 'block');
        }
    }

    $("button.navbar-toggle").click(function() {
        isExpanded();
    });

    // WHEN CLICK TOGGLE MENU ON DESKTOP
    $("#btnDropdownToggle").click(function() {

        if ($('div.dropdown-menu.mega-dropdown-menu').css('display') === 'none') {
            $('div.dropdown-menu.mega-dropdown-menu').slideDown("400");
            $('.dropdown.ddLastModuleVisited').addClass('disabled');
        } else {
            $('div.dropdown-menu.mega-dropdown-menu').slideUp("400");
            $('.dropdown.ddLastModuleVisited').removeClass('disabled');
        }
    });
});