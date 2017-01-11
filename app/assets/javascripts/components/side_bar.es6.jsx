class SideBar extends React.Component {
  render () {
    return (
        <div className="m-sidebar">
		        <NavigationMenu menu={this.props.menu} account_menu={this.props.account_menu} />
		        <SearchTab />
            <OverlayResultsContainer />
        </div>
    );
  }
}
