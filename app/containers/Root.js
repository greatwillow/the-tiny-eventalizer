import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { Constants } from "expo";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colors";
import * as actions from "../data/appActions";

import { connect } from "react-redux";

import ButtonAddUpdateDeleteEvent from "../components/ButtonAddUpdateDeleteEvent";
import Calendar from "../components/Calendar";
import ListHeader from "../components/ListHeader";
import ListOfEvents from "../components/ListOfEvents";
import ModalLoading from "../components/ModalLoading";

class Root extends Component {
  componentDidMount = () => {
    this.props.setLoadingModalVisibility(true);
    this.props.requestGetAllEvents();
  };

  //--------------------------------------------------
  // Modal Display Setup
  //--------------------------------------------------

  _onPressDisplayAddModal = () => {
    this.props.setModalPurpose("Add");
    this.props.setFormModalVisibility(true);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.statusBar} />
        <Calendar {...this.props} />
        <View style={{ flex: 1 }}>
          <ListHeader {...this.props} />
          <ListOfEvents {...this.props} />
        </View>
        <ButtonAddUpdateDeleteEvent
            style={styles.addButton}
            purpose={"Add"}
            size={70}
            color={COLORS.lightGreen}
            onPress={this._onPressDisplayAddModal}
            {...this.props}
          />
        <ModalLoading {...this.props} />
      </View>
    );
  }
}

Root.propTypes = {
  modalUI: PropTypes.shape({
    modalPurpose: PropTypes.string,
    formModalVisibility: PropTypes.bool,
    loadingModalVisibility: PropTypes.bool
  }),
  selectedDate: PropTypes.shape({
    selectedDate: PropTypes.object
  }),
  selectedEvent: PropTypes.shape({
    selectedEvent: PropTypes.func
  }),
  events:
    PropTypes.object ||
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        patientName: PropTypes.string,
        eventStartDate: PropTypes.func,
        eventEndDate: PropTypes.func
      })
    )
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: COLORS.red,
    height: Constants.statusBarHeight
  },
  mainContainer: {
    flex: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT + Constants.statusBarHeight,
    backgroundColor: COLORS.white
  },
  addButton: {
    position: "absolute",
    bottom: 3,
    right: 5,
    opacity: 0.9
  }
});

const mapStateToProps = state => ({
  events: state.events,
  listUI: state.listUI,
  modalUI: state.modalUI,
  selectedDate: state.selectedDate,
  selectedEvent: state.selectedEvent
});

const mapDispatchToProps = dispatch => ({
  requestAddEvent: event => dispatch(actions.requestAddEvent(event)),
  localAddEvent: event => dispatch(actions.localAddEvent(event)),
  requestGetEvent: event => dispatch(actions.requestGetEvent(event)),
  localGetEvent: event => dispatch(actions.localGetEvent(event)),
  requestGetAllEvents: () => dispatch(actions.requestGetAllEvents()),
  localGetAllEvents: () => dispatch(actions.localGetAllEvents()),
  requestUpdateEvent: event => dispatch(actions.requestUpdateEvent(event)),
  requestDeleteEvent: event => dispatch(actions.requestDeleteEvent(event)),
  localDeleteEvent: event => dispatch(actions.localDeleteEvent(event)),
  setListPurpose: listPurpose => dispatch(actions.setListPurpose(listPurpose)),
  setModalPurpose: modalPurpose =>
    dispatch(actions.setModalPurpose(modalPurpose)),
  setFormModalVisibility: formModalVisibility =>
    dispatch(actions.setFormModalVisibility(formModalVisibility)),
  setLoadingModalVisibility: loadingModalVisibility =>
    dispatch(actions.setLoadingModalVisibility(loadingModalVisibility)),
  setSelectedDate: selectedDate =>
    dispatch(actions.setSelectedDate(selectedDate)),
  setSelectedEvent: selectedEvent =>
    dispatch(actions.setSelectedEvent(selectedEvent))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
