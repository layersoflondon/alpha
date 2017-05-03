class Layers {
  static bindComponentToMapPinStore(component, fields) {
    boundClass = class extends component {
      constructor(props) {
        super(props);

        this.state = _.merge({},this.state,MapPinStore.getState());
        this.stateChanged = this.stateChanged.bind(this);
      }

      stateChanged(state) {
        this.setState(state);
        if (_.isFunction(super.stateChanged)) {
          super.stateChanged();
        }
      }

      updateAttribute(event) {
        var new_state = {};
        new_state[event.target.dataset.attribute] = event.target.value;
        MapPinActions.setFormAttribute(new_state);
        if (_.isFunction(super.updateAttribute)) {
          super.updateAttribute();
        }
      }

      componentWillMount() {
        MapPinStore.listen(this.stateChanged);
        if (_.isFunction(super.componentWillMount)) {
          super.componentWillMount();
        }
      }

      componentWillUnmount() {
        try {
          MapPinStore.unlisten(this.stateChanged);
          if (_.isFunction(super.componentWillUnmount)) {
            super.componentWillUnMount();
          }
        }catch(e) {
          debugger;
        }
      }

      render() {
        return super.render();
      }
    };
    boundClass.displayName = component.name;
    return boundClass;
  }


}