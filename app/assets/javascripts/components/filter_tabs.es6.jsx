var Tabs     = ReactTabs.Tabs,
    Tab      = ReactTabs.Tab,
    TabList  = ReactTabs.TabList,
    TabPanel = ReactTabs.TabPanel;

class FilterTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSelect(index, last) {
    console.log("Selected tab: " + index + ", Last tab: " + last);
  }

  render () {
    return (
      <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={0}>
        <TabList>
          <Tab>Search</Tab>
          <Tab>Overlays</Tab>
          <Tab>Collections</Tab>
        </TabList>

        <TabPanel>
          <SearchTab />
        </TabPanel>

        <TabPanel>
          <OverlaysTab />
        </TabPanel>

        <TabPanel>
          <CollectionsTab />
        </TabPanel>

      </Tabs>
    )
  }
}
