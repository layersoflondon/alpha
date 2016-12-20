class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isVisible: false};
  }

  toggleMenu() {
    this.setState({isVisible: !this.state.isVisible});
  }

  buttonClasses() {
    let classes = "c-hamburger c-hamburger--htx mti_font_element";

    if(this.state.isVisible) {
      classes += " is-active";
    }

    return classes;
  }

  menuClasses() {
    let classes = "m-navigation";

    if(this.state.isVisible) {
      classes += " is-visible";
    }

    return classes;
  }

  render() {
    return (
      <div className="m-navigation-menu">
        <h1 class="logo"><a href="/">Layers of London</a></h1>
        <button className={this.buttonClasses()} onClick={this.toggleMenu.bind(this)}>
          <span className="mti_font_element">toggle menu</span>
        </button>

        <div className={this.menuClasses()}>
          <div>
            <ul className="main-navigation-list">
              {this.props.menu.map((item, i) => {
                return <li key={i} className={item.className}><a href={item.link}>{item.title}</a></li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
