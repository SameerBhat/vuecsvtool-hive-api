export const clipboard = {
    
  data() {
    return {

      taskItemParagaphInContext: null,
      taskItemSpeakerInContext: null,
      contextMenuLinkClassName: "context-menu__link",
      contextMenuActive: "context-menu--active",
      menuState: 0,
      menuWidth: null,
      menuHeight: null,
      clickCoords: null,
      clickCoordsX: null,
      clickCoordsY: null,
      windowWidth: null,
      windowHeight: null
    };
  },
  methods: {
    
    clickInsideElement(e, className) {
      var el = e.srcElement || e.target;

      if (el.classList.contains(className)) {
        return el;
      } else {
        while ((el = el.parentNode)) {
          if (el.classList && el.classList.contains(className)) {
            return el;
          }
        }
      }

      return false;
    },
    contextListener(menu) {

     

      document.addEventListener("contextmenu", (e)=> {
        this.taskItemParagaphInContext = this.clickInsideElement(
          e,
          this.taskItemParagraphClassName
        );
        this.taskItemSpeakerInContext = this.clickInsideElement(
          e,
          this.taskItemSpeakerClassName
        );
  
        if (this.taskItemParagaphInContext) {
          e.preventDefault();
          this.toggleMenuOn(menu);
          this.positionMenu(e, menu);
          document.getElementById("speakerColSelected").value = false;
        } else if (this.taskItemSpeakerInContext) {
          e.preventDefault();
          this.toggleMenuOn(menu);
          this.positionMenu(e, menu);
          document.getElementById("speakerColSelected").value = true;
        } else {
          this.taskItemParagaphInContext = null;
          this.taskItemSpeakerInContext = null;
          this.toggleMenuOff(menu);
        }
      });
    },
    getPosition(e) {
      var posx = 0;
      var posy = 0;

      if (!e) e = window.event;

      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }

      return {
        x: posx,
        y: posy
      };
    },
  
  
  clickListener(menu) {
    document.addEventListener("click", (e)=> {
      var clickeElIsLink = this.clickInsideElement(
        e,
        this.contextMenuLinkClassName
      );

      if (clickeElIsLink) {
        e.preventDefault();
        this.menuItemListener(menu,clickeElIsLink);
      } else {
        var button = e.which || e.button;
        if (button === 1) {
          this.toggleMenuOff(menu);
        }
      }
    });
  },
  keyupListener(menu) {
    window.onkeyup = (e)=> {
      if (e.keyCode === 27) {
        this.toggleMenuOff(menu);
      }
    };
  },
  resizeListener(menu) {
    window.onresize = (e)=> {
      this.toggleMenuOff(menu);
    };
  },

  toggleMenuOn(menu) {
   
    if (this.menuState !== 1) {
      this.menuState = 1;
      menu.classList.add(this.contextMenuActive);
    }
  },

  toggleMenuOff(menu) {
    if (this.menuState !== 0) {
      this.menuState = 0;
      menu.classList.remove(this.contextMenuActive);
    }
  },
  positionMenu(e, menu) {
    this.clickCoords = this.getPosition(e);
    this.clickCoordsX = this.clickCoords.x;
    this.clickCoordsY = this.clickCoords.y;

    document.getElementById("selectedRow").value = e.target.getAttribute(
      "data-row"
    );

    this.menuWidth = menu.offsetWidth + 4;
    this.menuHeight = menu.offsetHeight + 4;

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    // console.log(`window width `+this.windowWidth)
    // console.log(`window height `+this.windowHeight)
    // console.log("from  top distance"+top)
    // menu.style.top = this.clickCoordsY + "px";


    
    if(this.isSpeakerSelected){

      menu.style.top = this.clickCoordsY -90 + "px";
      menu.style.left = this.clickCoordsX + 20 + "px";

    }else{
      menu.style.top = top+10 + "px";
      menu.style.left = this.clickCoordsX + 20 + "px";

    }
   
    

      
      // if ( (this.windowWidth - this.clickCoordsX) < this.menuWidth ) {
      //   menu.style.left = this.windowWidth - this.menuWidth + "px";
      // } else {
      //   menu.style.left = this.clickCoordsX + "px";
      // }
  
      // if ( (this.windowHeight - this.clickCoordsY) < this.menuHeight ) {
      //   menu.style.top = this.windowHeight - this.menuHeight + "px";
      // } else {
      //   menu.style.top = this.clickCoordsY + "px";
      // }
  },
  menuItemListener(menu,link) {
    //console.log( "Task ID - " + this.taskItemParagaphInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
    this.toggleMenuOff(menu);
  },

  initializeClipboard(menu) {
  
  
    this.contextListener(menu);
    this.clickListener(menu);
    this.keyupListener(menu);
    this.resizeListener(menu);
  }

}
};
