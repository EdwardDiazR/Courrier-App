// import { View, Text, Pressable } from "react-native";
// import React from "react";
// import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
// import { Colors } from "react-native/Libraries/NewAppScreen";
// import { Divider } from "react-native-paper";
// import { colors } from "@/constants/constants";

// export default function addPaymentMethod() {
//   return (
//     <View>
//        <BottomSheetView style={{ flex: 1, gap: 10 }}>
//               <View style={{ flex: 1 }}>
//                 <View style={{ gap: 4 }}>
//                   <Text style={{ fontFamily: "Varela" }}>
//                     Ingresar tarjeta de credito
//                   </Text>
//                   <BottomSheetTextInput
//                     style={{
//                       backgroundColor: colors.lightgray_background,
//                       minHeight: 30,
//                       maxHeight: 40,
//                       padding: 7,
//                       borderRadius: 5,
//                     }}
//                     placeholder="# de tarjeta, Ej: 5421-0000-0000-0000"
//                   />

//                   <View style={{ flexDirection: "row", gap: 10 }}>
//                     <View style={{ flex: 1, gap: 4 }}>
//                       <Text style={{ fontFamily: "Varela" }}>CVV o CVC</Text>
//                       <BottomSheetTextInput
//                         style={{
//                           backgroundColor: colors.lightgray_background,
//                           minHeight: 30,
//                           maxHeight: 40,
//                           padding: 7,
//                           borderRadius: 5,
//                         }}
//                         placeholder="3 digitos"
//                       />
//                     </View>
//                     <View style={{ flex: 1, gap: 4 }}>
//                       <Text style={{ fontFamily: "Varela" }}>Fecha</Text>
//                       <View style={{ flexDirection: "row" }}>
//                         <BottomSheetTextInput
//                           style={{
//                             backgroundColor: colors.lightgray_background,
//                             minHeight: 30,
//                             maxHeight: 40,
//                             padding: 7,
//                             borderRadius: 5,
//                           }}
//                           placeholder="Mes"
//                         />
//                         <Text>/</Text>
//                         <BottomSheetTextInput
//                           style={{
//                             backgroundColor: colors.lightgray_background,
//                             minHeight: 30,
//                             maxHeight: 40,
//                             padding: 7,
//                             borderRadius: 5,
//                           }}
//                           placeholder="Año"
//                         />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>

//               {/* Total and pay button */}
//               <View
//                 style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
//               >
//                 <Text style={{ fontSize: 17, fontFamily: "Signika" }}>
//                   Total: ${packageInfo.total}
//                 </Text>
//                 <Divider
//                   style={{
//                     borderColor: "lightgray",
//                     borderWidth: 0.3,
//                     height: "100%",
//                   }}
//                 />
//                 <Pressable
//                   style={{
//                     backgroundColor: Colors.primary_orange,
//                     borderRadius: 6,
//                     height: 40,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flex: 1,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontFamily: "Varela",
//                       fontSize: 15,
//                       color: "white",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Pagar
//                   </Text>
//                 </Pressable>
//               </View>
//             </BottomSheetView>
//     </View>
//   );
// }
