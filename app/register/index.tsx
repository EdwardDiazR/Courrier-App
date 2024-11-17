import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Button,
} from "react-native";
import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import {
  colors,
  fontSize,
  screenPadding,
  textInputStyle,
} from "@/constants/constants";
import { Dropdown } from "react-native-element-dropdown";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ValidateCedula } from "@/Services/AuthService";
import {
  Link,
  Redirect,
  router,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { usePreventRemoveContext } from "@react-navigation/native";
import countryList from "react-select-country-list";
import { RegisterDto } from "@/models/Customer";
import { StatusBar } from "expo-status-bar";

export default function register() {
  const { top, bottom } = useSafeAreaInsets();
  const options = useMemo(() => countryList().getData(), []);

  const navigation = useNavigation();
  const [Sucursal, SetSucursal] = useState<string>("");

  const [IdType, SetIdType] = useState<string>("cedula");
  const [isFocus, setIsFocus] = useState(false);
  const [NationalId, SetNationalId] = useState<string>("");
  const [NationalIdHasError, SetNationalIdHasError] = useState<boolean>(false);
  const [NationalIdCountry, SetNationalIdCountry] = useState("");
  const [FirstName, SetFirstName] = useState<string>("");
  const [MiddleName, SetMiddleName] = useState<string>("");
  const [LastName, SetLastName] = useState<string>("");
  const [SecondLastName, SetSecondLastName] = useState<string>("");
  const [Gender, SetGender] = useState<string>("");
  const [Email, SetEmail] = useState<string>("");

  const [PhoneNumber, SetPhoneNumber] = useState<string>("");
  const [Address, SetAddress] = useState<string>("");
  const [PhoneCountryCode, SetPhoneCountryCode] = useState<string>("+1");

  const [Password, SetPassword] = useState<string>("");

  const hasUnsavedChanges = Boolean(true);
  const { address } = useGlobalSearchParams<{ address: string }>();

  const [IsPasswordVisible, SetIsPasswordVisible] = useState<boolean>(false);
  const inputRef = useRef(null);

  const register = () => {
    console.log(NationalId);
    ValidateCedula(NationalId);

    const form: any = {
      firstName: FirstName,
      middleName: MiddleName,
      lastName: LastName,
      secondLastName: SecondLastName,
      gender: Gender,
      email: Email,
      phone: PhoneNumber,
      sucursal: Sucursal,
      idType: IdType,
      nationalId: NationalId,
      nationalIdCountry: NationalIdCountry,
      address: Address,
      password: Password,
    };

    router.push({ pathname: "/register/userConfiguration", params: form });
  };
  useEffect(() => {
    // navigation.addListener("beforeRemove", (e) => {
    //   e.preventDefault();
    //   Alert.alert(
    //     "Discard changes?",
    //     "You have unsaved changes. Are you sure to discard them and leave the screen?",
    //     [
    //       { text: "Don't leave", style: "cancel", onPress: () => {} },
    //       {
    //         text: "Discard",
    //         style: "destructive",
    //         // If the user confirmed, then we dispatch the action we blocked earlier
    //         // This will continue the action that had triggered the removal of the screen
    //         onPress: () => navigation.dispatch(e.data.action),
    //       },
    //     ]
    //   );
    // });
  }, [navigation, hasUnsavedChanges]);

  useEffect(() => {
    console.log("nav");
    console.log(options);
  }, [navigation]);

  useEffect(() => {
    if (address) {
      handleAddressFromLocation();
    }
  }, [address]);

  const showPasswordToggle = () => {
    SetIsPasswordVisible(!IsPasswordVisible);
  };
  const handleAddressFromLocation = () => {
    SetAddress(address);
  };

  const handleAddressChange = (text: string) => {
    SetAddress(text);
  };
  const data = [
    { label: "Cedula", value: "cedula" },
    { label: "Pasaporte", value: "pasaporte" },
  ];
  const genders = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
  ];

  const sucursales = [
    { label: "Los Rios", value: "LOS RIOS" },
    { label: "Piantini", value: "PIANTINI" },
  ];
  const handleNationalIdChange = (text: string) => {
    SetNationalId(text);
    if (text == "cedula") {
      SetNationalIdCountry("");
    }
  };

  const handleGenderSelection = (text: string) => {
    SetGender(text);
    console.log(text);
  };

  const handlePassword = (text: string) => {
    SetPassword(text);
  };

  const handleBackButton = () => {
    const can = router.canGoBack();
    console.log(can);

    if (can) {
      router.back();
    } else {
      router.replace("/auth/");
    }
  };

  function clearAll() {
    SetNationalId("");
    SetNationalIdHasError(false);
    SetGender("");
    SetPhoneNumber("");
    SetSucursal("");
    console.log("cleaning");
  }

  const item = {
    nombre: "juan",
    apellido: "diz",
  };

  useEffect(() => {
    SetNationalIdCountry(NationalIdCountry);
  }, [NationalIdCountry]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: screenPadding.horizontal,
        paddingBottom: bottom + 5,
        paddingTop: top,
        gap: 2,
      }}
    >
      <StatusBar animated />

      <ScrollView
        style={{
          backgroundColor: "white",
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        renderToHardwareTextureAndroid
      >
        <View style={{ flex: 1,paddingBottom:10 }}>
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", zIndex: 999 }}
              onPress={handleBackButton}
            >
              <Ionicons name="chevron-back" size={25} />
            </TouchableOpacity>

            <Text
              style={{
                textAlign: "center",
                fontSize: fontSize.lg,
                color: "black",
                fontFamily: "Varela",
                flex: 1,
              }}
            >
              Registrarte
            </Text>
          </View>
          {/* Sucursales field */}
          <View style={[Styles.SectionContainer, { gap: 3 }]}>
            <Text style={{ fontFamily: "Varela" }}>Sucursal</Text>
            <Dropdown
              style={[Styles.dropdown]}
              placeholderStyle={Styles.placeholderStyle}
              selectedTextStyle={Styles.selectedTextStyle}
              iconStyle={Styles.iconStyle}
              data={sucursales}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Seleccione su sucursal"}
              value={Sucursal}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              itemTextStyle={{ fontFamily: "Varela", fontSize: 13 }}
              itemContainerStyle={{
                borderRadius: 10,
              }}
              onChange={(item) => {
                SetSucursal(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <Ionicons
                  name="storefront"
                  size={17}
                  color={Colors.primary_orange}
                />
              )}
            />
          </View>

          {/* National Id Field */}
          <View style={[Styles.SectionContainer, { gap: 3 }]}>
            <Text style={{ fontFamily: "Varela", fontSize: fontSize.m }}>
              Documento de identidad
            </Text>
            {/* ID TYPE DROPDOWN */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Dropdown
                style={[Styles.dropdown]}
                dropdownPosition="auto"
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                iconStyle={Styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Tipo documento"}
                value={IdType}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  SetIdType(item.value);
                  setIsFocus(false);
                }}
                itemTextStyle={{ fontFamily: "Varela", fontSize: 13 }}
                itemContainerStyle={{
                  borderRadius: 10,
                }}
                renderLeftIcon={() => (
                  <FontAwesome
                    name="id-card"
                    size={17}
                    color={Colors.primary_orange}
                  />
                )}
              />
              <TextInput
                style={[Styles.InputStyle]}
                placeholder="No. documento identidad"
                keyboardType={IdType === "cedula" ? "number-pad" : "default"}
                value={NationalId}
                onChangeText={handleNationalIdChange}
                maxLength={IdType === "cedula" ? 11 : 20}
                cursorColor={"black"}
                onBlur={() => {
                  if (
                    IdType === "cedula" &&
                    NationalId.length &&
                    NationalId?.length < 11
                  ) {
                    SetNationalIdHasError(true);
                  }
                }}
              />
            </View>

            {IdType === "pasaporte" && (
              <View>
                <Text style={{ fontFamily: "Varela", fontSize: fontSize.m }}>
                  Pais del documento
                </Text>
                <Dropdown
                  style={[Styles.dropdown]}
                  dropdownPosition="auto"
                  placeholderStyle={Styles.placeholderStyle}
                  selectedTextStyle={Styles.selectedTextStyle}
                  iconStyle={Styles.iconStyle}
                  data={options}
                  maxHeight={350}
                  labelField={"label"}
                  valueField="value"
                  placeholder={"Pais del pasaporte"}
                  value={NationalIdCountry}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    SetNationalIdCountry(item.value);
                    setIsFocus(false);
                    SetNationalIdCountry("");
                  }}
                  itemTextStyle={{ fontFamily: "Varela", fontSize: 14 }}
                  itemContainerStyle={{
                    borderRadius: 10,
                  }}
                  searchField="label"
                  searchPlaceholder="Buscar por nombre"
                  inputSearchStyle={{
                    fontFamily: "Varela",
                    fontSize: 14,
                    height: 35,
                    cursor: "auto",
                    borderRadius: 10,
                    borderColor: "transparente",
                    backgroundColor: colors.lightgray_background,
                  }}
                  activeColor={Colors.primary_orange}
                  showsVerticalScrollIndicator
                  closeModalWhenSelectedItem
                  autoScroll
                  search
                  renderLeftIcon={() => (
                    <MaterialCommunityIcons
                      name="passport"
                      size={17}
                      color={Colors.primary_orange}
                    />
                  )}
                  renderInputSearch={(onSearch) => (
                    <TextInput
                      onChangeText={onSearch}
                      placeholder="Buscar pais por nombre"
                      style={{
                        borderWidth: 1.5,
                        borderColor: "gray",
                        borderRadius: 8,
                        margin: 5,
                        padding: 5,
                        fontFamily: "Varela",
                        fontSize: 14,
                      }}
                    />
                  )}
                />
              </View>
            )}

            {NationalIdHasError &&
              IdType === "cedula" &&
              NationalId.length < 11 && (
                <Text style={{ color: "red", fontFamily: "Varela" }}>
                  *La cedula debe tener 11 digitos
                </Text>
              )}
          </View>

          {/* Names field */}
          <View style={[Styles.SectionContainer, { gap: 3 }]}>
            <Text
              style={{
                fontSize: fontSize.m,
                fontFamily: "Varela",
                color: "black",
              }}
            >
              Nombre
            </Text>
            <TextInput
              style={[Styles.InputStyle, {}]}
              placeholder="Nombres"
              placeholderTextColor={"gray"}
              cursorColor={"black"}
              autoCapitalize="words"
            />
          </View>

          {/* Last name field */}
          <View
            style={[Styles.SectionContainer, { flexDirection: "row", gap: 10 }]}
          >
            <View style={{ flex: 1, gap: 3 }}>
              <Text
                style={{
                  fontSize: fontSize.m,
                  fontFamily: "Varela",
                  color: "black",
                }}
              >
                Primer apellido
              </Text>
              <TextInput
                style={[Styles.InputStyle]}
                placeholder="Primer apellido"
                placeholderTextColor={"gray"}
                cursorColor={"black"}
              />
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <Text
                style={{
                  fontSize: fontSize.m,
                  fontFamily: "Varela",
                  color: "black",
                }}
              >
                Segundo apellido
              </Text>
              <TextInput
                style={[Styles.InputStyle, {}]}
                placeholder="Segundo apellido (opcional)"
                placeholderTextColor={"gray"}
                cursorColor={"black"}
              />
            </View>
          </View>

          {/* Gender field */}
          <View style={[Styles.SectionContainer, { gap: 3 }]}>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 3 }}
            >
              <MaterialCommunityIcons
                name="gender-male-female"
                size={17}
                color={Colors.primary_orange}
              />
              <Text
                style={{
                  fontSize: fontSize.m,
                  fontFamily: "Varela",
                  color: "black",
                }}
              >
                Genero
              </Text>
            </View>
            <Dropdown
              style={[Styles.dropdown]}
              placeholderStyle={Styles.placeholderStyle}
              selectedTextStyle={Styles.selectedTextStyle}
              iconStyle={Styles.iconStyle}
              data={genders}
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder={"Seleccione su genero"}
              value={Gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              itemTextStyle={{ fontFamily: "Varela", fontSize: 13 }}
              itemContainerStyle={{
                borderRadius: 10,
              }}
              onChange={(item) => {
                handleGenderSelection(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          {/* Email field */}
          <View style={[Styles.SectionContainer, { gap: 3 }]}>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 3 }}
            >
              <MaterialIcons
                name="alternate-email"
                size={17}
                color={Colors.primary_orange}
              />
              <Text
                style={{
                  fontFamily: "Varela",
                  alignItems: "center",
                  fontSize: fontSize.m,
                }}
              >
                E-mail
              </Text>
            </View>
            <TextInput
              style={[Styles.InputStyle]}
              placeholder="ejemplo@mail.com"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              cursorColor={"black"}
            />
          </View>

          {/* Phone field */}
          <View style={[Styles.SectionContainer, { gap: 3 }]}>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 3 }}
            >
              <MaterialIcons
                name="phone"
                size={17}
                color={Colors.primary_orange}
              />
              <Text
                style={{
                  fontFamily: "Varela",
                  alignItems: "center",
                  fontSize: fontSize.m,
                }}
              >
                Telefono
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <TextInput
                style={[
                  Styles.InputStyle,
                  { maxWidth: 50, textAlign: "center" },
                ]}
                placeholder="Codigo pais"
                keyboardType="phone-pad"
                value={PhoneCountryCode}
                readOnly
                cursorColor={"black"}
              />
              <TextInput
                style={[Styles.InputStyle, { flex: 1 }]}
                placeholder="Numero telefonico"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                maxLength={10}
                cursorColor={"black"}
              />
            </View>
          </View>

          {/* Address field */}
          <View style={[Styles.SectionContainer, { gap: 5, marginBottom: 5 }]}>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 3 }}
            >
              <Feather name="map" size={17} color={Colors.primary_orange} />
              <Text
                style={{
                  fontFamily: "Varela",
                  alignItems: "center",
                  fontSize: fontSize.m,
                }}
              >
                Direccion
              </Text>
            </View>
            <TextInput
              style={[Address ? Styles.InputAddressStyle : Styles.InputStyle]}
              placeholder="Direccion "
              keyboardType="default"
              textContentType="fullStreetAddress"
              autoCapitalize="words"
              cursorColor={"black"}
              value={Address}
              onChangeText={handleAddressChange}
              clearButtonMode="always"
              multiline
              numberOfLines={3}
            />
            <Link
              href={"/register/locationModal"}
              style={{
                borderRadius: 10,
                padding: 5,
                textAlign: "center",
                backgroundColor: Colors.secondary_orange,
                elevation: 2,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 3,
                  flex: 1,
                }}
              >
                <FontAwesome name="map-marker" size={17} color={"white"} />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Varela",
                  }}
                >
                  Usar mi ubicacion
                </Text>
              </View>
            </Link>

            {/* <Redirect href={"/register/locationModal"} /> */}
          </View>

          {/* Divider */}
          <View style={{ borderWidth: 0.7, borderColor: "lightgray" }}></View>
          {/* <View>
            <Text>Estas registrado en el RUA?</Text>
          </View> */}

          {/* Password field */}
          <View style={[Styles.SectionContainer, { gap: 3 }]}>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 3 }}
            >
              <MaterialIcons
                name="password"
                size={17}
                color={Colors.primary_orange}
              />
              <Text style={{ fontFamily: "Varela" }}>Contraseña</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                height: textInputStyle.height,
                borderRadius: 5,
                borderWidth: 0,
                padding: 10,
                flex: 1,
                backgroundColor: colors.lightgray_background,
              }}
            >
              <TextInput
                style={[{ flex: 1 }]}
                placeholder="Contraseña"
                secureTextEntry={!IsPasswordVisible}
                autoCapitalize="none"
                cursorColor={"black"}
                textContentType="password"
                onChangeText={handlePassword}
                ref={inputRef}
              />

              <Pressable
                android_ripple={{
                  color: Colors.primary_orange,
                  borderless: true,
                  radius: 10,
                }}
                onPress={showPasswordToggle}
                style={{
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather
                  name={!IsPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                />
              </Pressable>
            </View>
          </View>

          {/* Confirm password field */}
          <View style={[Styles.SectionContainer, { gap: 5 }]}>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 3 }}
            >
              <MaterialIcons
                name="password"
                size={17}
                color={Colors.primary_orange}
              />
              <Text style={{ fontFamily: "Varela" }}>Confirmar contraseña</Text>
            </View>
            <TextInput
              style={[Styles.InputStyle]}
              placeholder="Repite la contraseña"
              secureTextEntry
              autoCapitalize="none"
              cursorColor={"black"}
              textContentType="newPassword"
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary_orange,
          height: 40,
          elevation: 2,
          borderRadius: 7,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={register}
      >
        <Text
          style={{
            fontFamily: "Varela",
            color: "white",
            fontWeight: "600",
            fontSize: 15,
          }}
        >
          Registrarme
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  SectionContainer: {
    marginVertical: 2.5,
  },
  InputStyle: {
    height: textInputStyle.height,
    borderRadius: 5,
    borderWidth: 0,
    padding: 10,
    paddingRight: 10,
    flex: 1,
    fontFamily: "Varela",
    backgroundColor: colors.lightgray_background,
    fontSize: 14,
    cursor: "auto",
    color: "black",
  },
  InputAddressStyle: {
    minHeight: textInputStyle.height,
    maxHeight: 50,
    borderRadius: 5,
    borderWidth: 0,
    padding: 1,
    paddingHorizontal: 10,
    flex: 1,
    fontFamily: "Varela",
    backgroundColor: colors.lightgray_background,
    fontSize: 14,
    cursor: "auto",
    color: "black",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: textInputStyle.height,
    minWidth: 130,
    backgroundColor: colors.lightgray_background,
    borderRadius: 5,
    fontSize: fontSize.xs,
    paddingHorizontal: 10,
  },

  label: {
    position: "absolute",
    backgroundColor: "black",
    zIndex: 999,
    fontSize: fontSize.xs,
    fontFamily: "Varela",
  },
  placeholderStyle: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: "gray",
    fontFamily: "Varela",
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: "Varela",
    marginHorizontal: 5,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
});
function useNavigationSearch() {
  throw new Error("Function not implemented.");
}
