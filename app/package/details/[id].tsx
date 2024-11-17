import {
  View,
  Text,
  Alert,
  Pressable,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { Package, StatusHistorial } from "@/models/Package";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as _packageService from "@/Services/packageService";
import { Colors } from "@/constants/Colors";
import {
  colors,
  fontSize,
  screenPadding,
  textInputStyle,
} from "@/constants/constants";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Button, Divider, Modal, ModalProps } from "react-native-paper";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetTimingConfigs,
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import pay from "../pay";
import Animated, { BounceIn, Easing } from "react-native-reanimated";
import {
  BottomSheetFlatListMethods,
  BottomSheetFlatListProps,
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import PaymentMethodCard from "@/components/payment/PaymentMethodCard";
const Details = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [IsDeliveryModalVisible, SetIsDeliveryModalVisible] =
    useState<boolean>(false);

  const getStatusByStatusId = (statusId: number) => {
    switch (statusId) {
      case 1:
        return "Recibido en Miami";
        break;
      case 2:
        return "Empacado";
        break;
      case 3:
        return "Embarcado";
        break;
      case 4:
        return "Aduana";
        break;
      case 5:
        return "Retenido";
        break;
      case 6:
        return "Centro de distribucion";
        break;
      case 7:
        return "Transferido";
        break;
      case 8:
        return "Recibido en sucursal";
        break;
      case 9:
        return "Disponible";
        break;
      case 10:
        return "Retirado";
        break;
    }
  };

  const historial: StatusHistorial[] = [
    {
      status: "Disponible",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        dateStyle: "short",
        timeStyle: "short",
        minute: "2-digit",
      }),
    },

    {
      status: "En sucursal",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        dateStyle: "short",
        timeStyle: "short",
        minute: "2-digit",
      }),
    },
    {
      status: "Centro de distribucion",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        dateStyle: "short",
        timeStyle: "short",
        minute: "2-digit",
      }),
    },
    {
      status: "Aduana",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        dateStyle: "short",
        timeStyle: "short",
        minute: "2-digit",
      }),
    },
    {
      status: "Embarcado",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        dateStyle: "short",
        timeStyle: "short",
        minute: "2-digit",
      }),
    },
    {
      status: "Empacado",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        dateStyle: "short",
        timeStyle: "short",
        minute: "2-digit",
      }),
    },
    {
      status: "Recibido en Miami",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        dateStyle: "short",
        timeStyle: "short",
        minute: "2-digit",
      }),
    },
  ];
  const [packageInfo, SetPackageInfo] = useState<Package>({
    category: "Electronicos",
    hasPreAlert: false,
    id: "WR91249825",
    status: getStatusByStatusId(9),
    statusId: 9,
    transportCompany: "USPS",
    weight: 0.42,
    date: new Date().toString(),
    total: 500.23,
    seller: "AMAZON",
    trackingId: "2337961026471014",
    articlesQuantity: 2,
    statusHistorial: historial,
  });

  //Status history bottom sheet modal
  const statusHistoryRef = useRef<BottomSheetModal>(null);
  const openStatusHistoryBottomSheet = () => statusHistoryRef.current?.expand();
  const closeStatusHistoryBottomSheet = () => {
    statusHistoryRef.current?.close();
    //Scroll or reset list to top when closing this bottom sheet
    historyListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };
  const statusHistorySnapPoints = useMemo(() => ["60%"], []);
  const data = useMemo(() => historial, []);

  const historyListRef = useRef<BottomSheetFlatListMethods>(null);

  const [IsRefreshingHistoryList, SetIsRefreshingHistoryList] =
    useState<boolean>(false);
  const refreshHistoryList = () => {
    SetIsRefreshingHistoryList(!IsRefreshingHistoryList);
    //TODO: CALL API AGAIN
  };

  // Payment bottomSheet Modal
  const paymentBottomSheetRef = useRef<BottomSheetModal>(null);
  const openPaymentBottomSheet = () => paymentBottomSheetRef.current?.expand();
  const closePaymentBottomSheet = () => {
    paymentBottomSheetRef.current?.close();
    Keyboard.dismiss();
  };
  const paymentSnapPoints = useMemo(() => ["60%"], []);

  //Payment
  const [CreditCardNumber, SetCreditCardNumber] = useState<string>();
  const [CVV, SetCVV] = useState<number>();
  const [CCExpMonth, SetCCExpMonth] = useState<string>();
  const [CCExpYear, SetCCExpYear] = useState<string>();
  const [SelectedCard, SetSelectedCard] = useState<string | null>("VISA");

  //Delivery methods
  const handleDeliveryModal = () => {
    SetIsDeliveryModalVisible(!IsDeliveryModalVisible);

    // if (packageInfo.statusId <= 6) {
    //   SetIsDeliveryModalVisible(!IsDeliveryModalVisible);
    // } else {
    //   Alert.alert(
    //     "Lo sentimos",
    //     "Ya tu paquete esta preparado para ser enviado a tu sucursal, debes pasar a recogerlo en cuanto este disponible Disculpe los inconvenientes"
    //   );
    // }
  };

  const SetPackageToDeliver = () => {
    SetIsDeliveryModalVisible(false);
    //TODO: CALL API TO DELIVER PACKAGE
  };

  // render
  const renderItem = useCallback(
    ({ item }: { item: StatusHistorial }) => (
      <View style={{ flexDirection: "column", marginVertical: 5 }}>
        <Text style={{ fontFamily: "Varela", fontSize: 14 }}>
          {item.status}
        </Text>
        <Text style={{ fontFamily: "Signika", fontSize: 12, color: "gray" }}>
          {item.time}
        </Text>
      </View>
    ),
    []
  );

  // useEffect(() => {
  //   _packageService.getPackageById(id);
  // }, [id]);

  // callback
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const SelectCard = (type: string) => {
    SetSelectedCard(type);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 5,
        paddingBottom: bottom,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <View
              style={{
                paddingTop: top,
                justifyContent: "center",
                alignItems: "center",
                height: 80,
                flexDirection: "row",
                gap: 5,
                backgroundColor: "transparent",
                position: "relative",
              }}
            >
              {router.canGoBack() && (
                <Pressable
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 0,
                    zIndex: 999,
                    marginTop: top + 10,
                  }}
                  onPress={() => {
                    router.back();
                  }}
                >
                  <Ionicons name="chevron-back" size={25} />
                </Pressable>
              )}
              <Feather
                name="package"
                size={25}
                color={Colors.secondary_orange}
              />
              <Text style={{ fontSize: 17, fontFamily: "Varela" }}>{id}</Text>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, gap: 10, paddingBottom: bottom + 10 }}>
          <View
            style={{
              backgroundColor: Colors.primary_orange,
              borderRadius: 10,
              height: 70,
              elevation: 1,
              padding: 15,
              gap: 5,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: screenPadding.horizontal,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Varela",
                letterSpacing: 0.7,
                fontSize: 15,
              }}
            >
              Status de tu paquete
            </Text>
            <View
              style={{
                backgroundColor: "white",
                padding: 5,
                borderRadius: 10,
                paddingHorizontal: 15,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  color: Colors.secondary_orange,
                  fontFamily: "Signika",
                  fontWeight: "condensedBold",
                  fontSize: 15,
                }}
              >
                {packageInfo.status}
              </Text>
            </View>
          </View>

          {/* Details */}
          <View style={{ gap: 3, marginBottom: 5 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                marginHorizontal: screenPadding.horizontal,
              }}
            >
              <Octicons
                name="package-dependents"
                size={17}
                color={Colors.brown_text}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Varela",
                  color: Colors.brown_text,
                }}
              >
                Detalles
              </Text>
            </View>
            <View
              style={{
                gap: 4,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,

                backgroundColor: colors.lightgray_background,
                paddingHorizontal: screenPadding.horizontal,
                paddingVertical: 5,
                elevation: 2,
                marginVertical: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                Referencia:{" "}
                <Text
                  style={{
                    color: Colors.brown_text,
                    fontFamily: "Signika",
                  }}
                >
                  {packageInfo.id}
                </Text>
              </Text>
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                Fecha recepcion:{" "}
                <Text
                  style={{
                    color: Colors.brown_text,
                    fontFamily: "Signika",
                  }}
                >
                  {new Date(packageInfo.date).toLocaleDateString()}
                </Text>
              </Text>
              <Divider
                theme={{
                  colors: {
                    outlineVariant: Colors.primary_orange,
                  },
                }}
                bold={true}
                style={{}}
              />
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                Categoria:{" "}
                <Text
                  style={{ color: Colors.brown_text, fontFamily: "Signika" }}
                >
                  {packageInfo.category}
                </Text>
              </Text>
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                Comercio:{" "}
                <Text
                  style={{ color: Colors.brown_text, fontFamily: "Signika" }}
                >
                  {packageInfo.seller}
                </Text>
              </Text>
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                Cant. Articulos:{" "}
                <Text
                  style={{ color: Colors.brown_text, fontFamily: "Signika" }}
                >
                  {packageInfo.articlesQuantity}
                </Text>
              </Text>
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                Peso:{" "}
                <Text
                  style={{ color: Colors.brown_text, fontFamily: "Signika" }}
                >
                  {packageInfo.weight}lbs
                </Text>
              </Text>

              <Divider
                theme={{
                  colors: {
                    outlineVariant: Colors.primary_orange,
                  },
                }}
                bold={true}
                style={{}}
              />
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                Transportista:{" "}
                <Text
                  style={{ color: Colors.brown_text, fontFamily: "Signika" }}
                >
                  {packageInfo.transportCompany}
                </Text>
              </Text>
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 16,
                }}
              >
                # Tracking:{" "}
                <Text
                  style={{ color: Colors.brown_text, fontFamily: "Signika" }}
                >
                  {packageInfo.trackingId}
                </Text>
              </Text>
            </View>
          </View>

          {/* Last movement */}
          <View style={{ marginHorizontal: screenPadding.horizontal }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <FontAwesome6
                name="clock-four"
                size={17}
                color={Colors.brown_text}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Varela",
                  color: Colors.brown_text,
                }}
              >
                Ultimo movimiento del paquete
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#F99417",
                marginVertical: 5,
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{ fontFamily: "Signika", fontSize: 18, color: "white" }}
              >
                {packageInfo.statusHistorial[0].status}
              </Text>
              <Text
                style={{ fontFamily: "Varela", fontSize: 12.3, color: "white" }}
              >
                {packageInfo.statusHistorial[0].time}
              </Text>
            </View>

            <Pressable onPress={openStatusHistoryBottomSheet} style={{}}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Varela",
                  color: Colors.brown_text,
                  fontSize: 14,
                  textDecorationLine: "underline",
                }}
              >
                Ver historial completo
              </Text>
            </Pressable>
          </View>

          {/* Actions */}
          <View style={{ gap: 10, marginHorizontal: screenPadding.horizontal }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <MaterialIcons
                name="settings-suggest"
                size={17}
                color={Colors.brown_text}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Varela",
                  color: Colors.brown_text,
                }}
              >
                Acciones
              </Text>
            </View>

            <Pressable style={[Styles.ActionButtonContainer]}>
              <View style={[Styles.ActionButtonView]}>
                <FontAwesome6
                  name="file-invoice-dollar"
                  size={22}
                  color={Colors.secondary_orange}
                />
                <Text style={[Styles.ActionButtonText]}>Subir factura</Text>
              </View>
            </Pressable>

            <Pressable style={[Styles.ActionButtonContainer]}>
              <View style={[Styles.ActionButtonView]}>
                <MaterialCommunityIcons
                  name="file-export"
                  size={22}
                  color={Colors.secondary_orange}
                />
                <Text style={[Styles.ActionButtonText]}>
                  Solicitar prueba de exportacion
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[Styles.ActionButtonContainer]}
              onPress={handleDeliveryModal}
            >
              <View style={[Styles.ActionButtonView]}>
                <MaterialIcons
                  name="delivery-dining"
                  size={25}
                  color={Colors.secondary_orange}
                />
                <Text style={[Styles.ActionButtonText]}>
                  Recibir por delivery
                </Text>
              </View>
            </Pressable>
          </View>

          <View style={{ gap: 10, marginHorizontal: screenPadding.horizontal }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <MaterialIcons
                name="settings-suggest"
                size={17}
                color={Colors.brown_text}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Varela",
                  color: Colors.brown_text,
                }}
              >
                Facturacion
              </Text>
            </View>

            <Pressable style={[Styles.ActionButtonContainer]}>
              <View style={[Styles.ActionButtonView]}>
                <FontAwesome6
                  name="file-invoice-dollar"
                  size={20}
                  color={Colors.secondary_orange}
                />
                <Text style={[Styles.ActionButtonText]}>Ver factura final</Text>
              </View>
            </Pressable>

            {/* Pay button */}

            <Pressable
              style={[Styles.ActionButtonContainer]}
              onPress={openPaymentBottomSheet}
            >
              <View style={[Styles.ActionButtonView]}>
                <MaterialIcons
                  name="payment"
                  size={24}
                  color={Colors.secondary_orange}
                />
                <Text style={[Styles.ActionButtonText]}>Pagar online</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Status history BottomSheet Modal */}
      <BottomSheet
        snapPoints={statusHistorySnapPoints}
        ref={statusHistoryRef}
        bottomInset={bottom}
        backdropComponent={renderBackdrop}
        onClose={closeStatusHistoryBottomSheet}
        index={-1}
        overDragResistanceFactor={0}
        handleIndicatorStyle={{ display: "none" }}
        enableOverDrag={false}
      >
        <BottomSheetView
          style={{
            paddingHorizontal: screenPadding.horizontal,
            flex: 1,
            gap: 5,
          }}
        >
          {/* Header view */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <FontAwesome6
                name="clock-four"
                size={17}
                color={Colors.brown_text}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Varela",
                  color: Colors.brown_text,
                }}
              >
                Todos movimientos
              </Text>
            </View>

            <Ionicons
              name="close"
              size={27}
              color={Colors.secondary_orange}
              onPress={closeStatusHistoryBottomSheet}
            />
          </View>

          {/* History list */}
          <BottomSheetFlatList
            data={data}
            scrollEnabled
            ref={historyListRef}
            overScrollMode={"auto"}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginVertical: "45%",
                  gap: 10,
                  paddingHorizontal: screenPadding.horizontal,
                }}
              >
                <MaterialCommunityIcons
                  name="timer-sand-empty"
                  size={40}
                  color={Colors.secondary_orange}
                />
                <Text
                  style={[
                    ,
                    {
                      color: Colors.secondary_orange,
                      fontSize: 18,
                      fontFamily: "Varela",
                    },
                  ]}
                >
                  Tu paquete aun no tiene movimientos
                </Text>
              </View>
            )}
            keyExtractor={(i, index) => i.status}
            contentContainerStyle={{ gap: 2 }}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshing={IsRefreshingHistoryList}
            onRefresh={refreshHistoryList}
            ItemSeparatorComponent={() => (
              <Divider style={{ marginVertical: 3 }} />
            )}
          />
        </BottomSheetView>
      </BottomSheet>

      {/* Payment BottomSheet Modal */}
      <BottomSheet
        backdropComponent={renderBackdrop}
        snapPoints={paymentSnapPoints}
        enablePanDownToClose
        ref={paymentBottomSheetRef}
        onChange={handleSheetChanges}
        onClose={closePaymentBottomSheet}
        detached={true}
        style={{
          marginHorizontal: 10,
          marginVertical: bottom,
        }}
        bottomInset={15}
        index={-1}
      >
        <View
          style={{
            paddingHorizontal: screenPadding.horizontal,
            flex: 1,
            paddingBottom: 10,
            gap: 10,
          }}
        >
          {/* Header view */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <FontAwesome6
                name="clock-four"
                size={17}
                color={Colors.brown_text}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Varela",
                  color: Colors.brown_text,
                }}
              >
                Pago
              </Text>
            </View>

            <Ionicons
              name="close"
              size={27}
              color={Colors.secondary_orange}
              onPress={closePaymentBottomSheet}
            />
          </View>

          {/* TODO: CHECK IF PACKAGE IS PAID TO ENABLE PAYMENT */}

          <View style={{ flex: 1, gap: 13, paddingHorizontal: 4 }}>
            <PaymentMethodCard
              cardBrand={"MC"}
              cardType={"Credito"}
              maskedNumber="**** 0550"
              isSelected={SelectedCard == "MC"}
              SelectCard={SelectCard}
              isPrincipal={true}
            />

            <PaymentMethodCard
              cardBrand={"VISA"}
              cardType={"Debito"}
              maskedNumber="**** 9867"
              isSelected={SelectedCard == "VISA"}
              SelectCard={SelectCard}
              isPrincipal={false}
            />

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  padding: 5,
                  alignSelf: "center",
                }}
              >
                <FontAwesome
                  name="plus"
                  size={17}
                  color={Colors.secondary_orange}
                />
                <Text
                  style={{
                    fontFamily: "Signika",
                    color: Colors.secondary_orange,
                  }}
                >
                  Agregar nueva tarjeta
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Total and pay button */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <Text style={{ fontSize: 17, fontFamily: "Signika" }}>
              Total: ${packageInfo.total}
            </Text>
            <Divider
              style={{
                borderColor: "lightgray",
                borderWidth: 0.3,
                height: "100%",
              }}
            />
            <Pressable
              style={{
                backgroundColor: Colors.primary_orange,
                borderRadius: 6,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "Varela",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Pagar
              </Text>
            </Pressable>
          </View>

          {packageInfo.statusId < 9 && packageInfo.total == 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "Varela", fontSize: 15 }}>
                Aun tu paquete no esta disponible para pago
              </Text>
            </View>
          )}
        </View>
      </BottomSheet>

      {/* Delivery Modal */}
      <Modal
        onDismiss={handleDeliveryModal}
        visible={IsDeliveryModalVisible}
        contentContainerStyle={{
          backgroundColor: "white",
          margin: 15,
          borderRadius: 15,
          flexBasis: "auto",
          maxHeight: "auto",
        }}
        style={{
          justifyContent: "center",
        }}
      >
        <View
          style={{
            padding: 15,
            gap: 10,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <MaterialIcons
              name="delivery-dining"
              size={25}
              color={Colors.secondary_orange}
            />
            <Text
              style={{
                fontSize: 19,
                fontFamily: "Varela",
                color: Colors.secondary_orange,
                textAlign: "center",
              }}
            >
              Recibir por delivery
            </Text>
          </View>

          <View style={{ justifyContent: "center", gap: 6 }}>
            <Text style={{ fontSize: 14, fontFamily: "Varela" }}>
              Para recibir tu paquete por delivery, favor verifica que tu
              direccion este actualizada:
            </Text>

            {/* Address field */}
            <View style={{ gap: 3 }}>
              <TextInput
                style={{
                  minHeight: textInputStyle.height,
                  elevation: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  fontFamily: "Varela",
                  backgroundColor: colors.lightgray_background,
                  fontSize: 12,
                  color: "black",
                }}
                placeholder="Direccion "
                keyboardType="default"
                textContentType="fullStreetAddress"
                autoCapitalize="words"
                readOnly
                cursorColor={"black"}
                value={
                  "Coordinador de las Direcciones Provinciales. Coordinador: Erasmo Rafael Pichardo Cruz Tel.: 809-567-4300 Ext. 6406. Flota: 809-763-1539. Dirección: Ave."
                }
                clearButtonMode="always"
                multiline
                numberOfLines={3}
              />
              <Link
                href={"/user/updateAddress"}
                style={{
                  fontSize: 13,
                  textDecorationLine: "underline",
                  textAlign: "center",
                }}
              >
                Actualizar mi direccion ahora
              </Link>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-end",
              marginTop: 10,
            }}
          >
            {/* Cancel or out button */}
            <Pressable
              style={[Styles.BottomButtons, { backgroundColor: "red" }]}
              onPress={handleDeliveryModal}
            >
              <Text style={[Styles.BottomButtonsText]}>Salir</Text>
            </Pressable>
            <Pressable
              style={[
                Styles.BottomButtons,
                { backgroundColor: colors.success_green },
              ]}
              onPress={SetPackageToDeliver}
            >
              <Text style={[Styles.BottomButtonsText]}>
                Si, enviar a esta direccion
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Styles = StyleSheet.create({
  BottomButtons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 10,
  },

  BottomButtonsText: {
    color: "white",
    fontSize: 13,
    fontFamily: "SignikaSemiBold",
  },

  ActionButtonContainer: {
    borderRadius: 6,
    borderColor: Colors.secondary_orange,
    borderWidth: 1,
    backgroundColor: "white",
    height: 37,
    overflow: "hidden",
  },
  ActionButtonView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
  },

  ActionButtonText: {
    fontSize: 15,
    fontFamily: "Varela",
    color: Colors.secondary_orange,
  },
});

export default Details;
