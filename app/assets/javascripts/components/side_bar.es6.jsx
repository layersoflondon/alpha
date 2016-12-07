class SideBar extends React.Component {
  render () {
    return (
        <div className="m-sidebar">
		        <SearchTab />
            <NavigationMenu menu={this.props.menu} />
            <OverlayResultsContainer />
        </div>
    );
  }
}
