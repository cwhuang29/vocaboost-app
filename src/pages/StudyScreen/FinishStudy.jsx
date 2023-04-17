import React from 'react';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

import { Text, View, VStack } from 'native-base';

const FinishStudyImgXml = `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="670.71277" height="675.70154" viewBox="0 0 670.71277 675.70154" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M433.83374,760.55961a3.61323,3.61323,0,0,1-2.61866-6.26262c.09111-.36213.15647-.62217.24758-.9843a9.70742,9.70742,0,0,0-17.99686-.16974c-4.28226,10.02341-9.82453,20.4-7.06825,31.44012-18.206-38.58538-12.01459-86.582,14.89138-119.57967,7.43714-4.09684,13.46508-11.37558,15.03439-19.82719-3.6807,1.24714-8.26984-1.74675-5.50237-5.62382,1.19955-1.48179,2.41076-2.95192,3.6102-4.4338-13.98172-14.89039-30.6407,8.512-15.25087,28.60947A115.847,115.847,0,0,0,406.169,684.07991a48.70929,48.70929,0,0,0-2.908-22.62447c-2.78346-6.71479-8.00064-12.37-12.595-18.17495-5.58607-7.07309-17.083-3.80994-17.83469,5.16592,5.15526,1.69443,5.825,9.14117-.072,10.16037,1.54456,16.69795,12.45346,32.04321,27.47828,39.36634a116.2988,116.2988,0,0,0-6.35538,48.61141c-2.65207-19.25-23.31569-23.92148-37.7586-31.57247a5.626,5.626,0,0,0-8.5801,5.69851,32.49472,32.49472,0,0,1,5.69583,3.00488,4.91123,4.91123,0,0,1-2.28162,8.96546c7.28014,18.01805,26.10227,30.11728,45.43371,30.04916a119.56344,119.56344,0,0,0,8.03167,23.447h28.69167c.10292-.3188.19543-.64792.288-.96672a32.59928,32.59928,0,0,1-7.93916-.473c7.02637-8.31908,12.46032-12.56336,8.371-24.17721Z" transform="translate(-264.64361 -112.14923)" fill="#f2f2f2"/><path d="M689.62625,760.55961a3.61323,3.61323,0,0,0,2.61866-6.26262c-.09111-.36213-.15647-.62217-.24758-.9843a9.70742,9.70742,0,0,1,17.99686-.16974c4.28226,10.02341,9.82453,20.4,7.06825,31.44012,18.206-38.58538,12.01458-86.582-14.89138-119.57967-7.43714-4.09684-13.46509-11.37558-15.03439-19.82719,3.6807,1.24714,8.26984-1.74675,5.50237-5.62382-1.19956-1.48179-2.41076-2.95192-3.6102-4.4338,13.98172-14.89039,30.6407,8.512,15.25086,28.60947A115.84646,115.84646,0,0,1,717.291,684.07991a48.70916,48.70916,0,0,1,2.908-22.62447c2.78346-6.71479,8.00064-12.37,12.595-18.17495,5.58608-7.07309,17.083-3.80994,17.8347,5.16592-5.15526,1.69443-5.825,9.14117.072,10.16037-1.54455,16.69795-12.45345,32.04321-27.47828,39.36634a116.29881,116.29881,0,0,1,6.35539,48.61141c2.65207-19.25,23.31569-23.92148,37.75859-31.57247a5.626,5.626,0,0,1,8.58011,5.69851,32.49472,32.49472,0,0,0-5.69583,3.00488,4.91123,4.91123,0,0,0,2.28162,8.96546C765.22214,750.699,746.4,762.79819,727.06856,762.73007a119.56213,119.56213,0,0,1-8.03167,23.447H690.34522c-.10291-.3188-.19542-.64792-.288-.96672a32.59917,32.59917,0,0,0,7.93915-.473c-7.02636-8.31908-12.46031-12.56336-8.371-24.17721Z" transform="translate(-264.64361 -112.14923)" fill="#f2f2f2"/><polygon points="435.621 652.671 423.265 655.481 406.541 609.159 424.778 605.01 435.621 652.671" fill="#ffb6b6"/><path d="M703.63334,777.61045l-37.99713,8.6454-.10935-.48053a15.16836,15.16836,0,0,1,11.42388-18.15477l.00091-.00021,5.74235-6.845,14.14807,2.31939,3.31689-.7547Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><polygon points="634.947 426.88 641.739 437.577 603.711 468.871 593.685 453.082 634.947 426.88" fill="#ffb6b6"/><path d="M910.51,531.565l20.89046,32.89549-.416.26421a15.16835,15.16835,0,0,1-20.935-4.672l-.00051-.00079-8.3746-3.11352L899.1135,542.832l-1.8236-2.87155Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M505.71851,424.66143l-3.05179-17.68893L549.064,386.02129l10.01992-17.74014a8.6255,8.6255,0,1,1,12.73916,5.72525l-16.48288,25.48313Z" transform="translate(-264.64361 -112.14923)" fill="#a0616a"/><polygon points="226.971 298.052 247.865 287.379 253.396 308.147 238.883 318.905 226.971 298.052" fill="#91b5a9"/><polygon points="180.086 651.062 192.719 651.061 198.729 602.332 180.083 602.333 180.086 651.062" fill="#a0616a"/><path d="M461.56659,764.34828v-8.56464l-3.32125.20291-13.51968.80093-3.129.19221-2.3921,28.684-.12814,1.53778h8.97038l.28836-1.5271L449.638,778.733l3.36394,6.94139.73686,1.5271h23.78232a5.3736,5.3736,0,0,0,5.33953-5.35022C483.8645,777.16317,464.08683,767.02874,461.56659,764.34828Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><polygon points="30.123 457.676 27.178 469.962 73.163 487.168 77.509 469.036 30.123 457.676" fill="#a0616a"/><path d="M290.73483,585.93371l8.32858,1.99694.57707-3.277,2.37341-13.33379.54263-3.08754-27.33571-9.01417-1.46553-.48317-2.09154,8.72315,1.41778.63647,6.44631,2.88537-7.53442,1.65275-1.65682.36049L264.79149,596.12a5.37361,5.37361,0,0,0,3.95779,6.43983C273.07414,604.62912,287.54063,587.75951,290.73483,585.93371Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M464.26323,447.83918,448.002,440.23767l-32.4281,39.24382L395.82149,484.477a8.6255,8.6255,0,1,0,2.16908,13.79709l28.92383-9.19171Z" transform="translate(-264.64361 -112.14923)" fill="#a0616a"/><path d="M694.80226,302.5638A17.42774,17.42774,0,1,1,712.23,285.13606,17.44724,17.44724,0,0,1,694.80226,302.5638Zm0-32.85547A15.42774,15.42774,0,1,0,710.23,285.13606,15.44526,15.44526,0,0,0,694.80226,269.70833Z" transform="translate(-264.64361 -112.14923)" fill="#e6e6e6"/><path d="M693.57236,291.70163c-.035,0-.07005-.00113-.10507-.00284a2.14825,2.14825,0,0,1-1.59248-.82742l-2.74536-3.5295a2.14913,2.14913,0,0,1,.3767-3.01642l.0988-.07687a2.1489,2.1489,0,0,1,3.017.377,1.56764,1.56764,0,0,0,2.37407.1156l5.57413-5.88477a2.15234,2.15234,0,0,1,3.03891-.08257l.0914.08712a2.14888,2.14888,0,0,1,.082,3.03863l-8.65034,9.13067A2.1469,2.1469,0,0,1,693.57236,291.70163Z" transform="translate(-264.64361 -112.14923)" fill="#e6e6e6"/><path d="M607.80226,513.5638A17.42774,17.42774,0,1,1,625.23,496.13606,17.44724,17.44724,0,0,1,607.80226,513.5638Zm0-32.85547A15.42774,15.42774,0,1,0,623.23,496.13606,15.44526,15.44526,0,0,0,607.80226,480.70833Z" transform="translate(-264.64361 -112.14923)" fill="#e6e6e6"/><path d="M606.57236,502.70163c-.035,0-.07005-.00113-.10507-.00284a2.14825,2.14825,0,0,1-1.59248-.82742l-2.74536-3.5295a2.14913,2.14913,0,0,1,.3767-3.01642l.0988-.07687a2.1489,2.1489,0,0,1,3.017.377,1.56764,1.56764,0,0,0,2.37407.1156l5.57413-5.88477a2.15234,2.15234,0,0,1,3.03891-.08257l.0914.08712a2.14888,2.14888,0,0,1,.082,3.03863l-8.65034,9.13067A2.1469,2.1469,0,0,1,606.57236,502.70163Z" transform="translate(-264.64361 -112.14923)" fill="#e6e6e6"/><path d="M416.80226,278.5638A17.42774,17.42774,0,1,1,434.23,261.13606,17.44724,17.44724,0,0,1,416.80226,278.5638Zm0-32.85547A15.42774,15.42774,0,1,0,432.23,261.13606,15.44526,15.44526,0,0,0,416.80226,245.70833Z" transform="translate(-264.64361 -112.14923)" fill="#e6e6e6"/><path d="M415.57236,267.70163c-.035,0-.07-.00113-.10507-.00284a2.14825,2.14825,0,0,1-1.59248-.82742l-2.74536-3.5295a2.14913,2.14913,0,0,1,.3767-3.01642l.0988-.07687a2.1489,2.1489,0,0,1,3.017.377,1.56764,1.56764,0,0,0,2.37407.1156l5.57413-5.88477a2.15234,2.15234,0,0,1,3.03891-.08257l.0914.08712a2.14888,2.14888,0,0,1,.082,3.03863l-8.65034,9.13067A2.1469,2.1469,0,0,1,415.57236,267.70163Z" transform="translate(-264.64361 -112.14923)" fill="#e6e6e6"/><path d="M556.32861,578.362c-40.4127,0-86.85713-44.8462-127.94893-23.53858-124.415,64.51367-107.28858-43.43994-143.032-83.58887l1.17347-2.35367c39.43876,35.36308,88.67933,64.13529,142.3988,83.20477,48.54556,17.23457,97.45513,25.21994,141.42331,23.11263l.07631,2.8291Q563.45454,578.36336,556.32861,578.362Z" transform="translate(-264.64361 -112.14923)" fill="#f2f2f2"/><ellipse cx="236.24897" cy="151.67565" rx="8.44737" ry="11.32747" fill="#e6e6e6"/><path d="M598.45942,451.86256c-3.862,2.57319-7.8147-3.55124-3.87848-6.01019C598.44276,443.27934,602.39545,449.40379,598.45942,451.86256Z" transform="translate(-264.64361 -112.14923)" fill="#e6e6e6"/><circle cx="311.58637" cy="122.52998" r="11.00001" fill="#ff6584"/><path d="M614.704,294.95824l62.5932-182.809L608.56592,292.76991a3.44161,3.44161,0,1,0,6.138,2.18833Z" transform="translate(-264.64361 -112.14923)" fill="#f0f0f0" opacity="0.3" style="isolation:isolate"/><circle cx="286.88015" cy="394.82131" r="10.70233" fill="#f2f2f2"/><path d="M447.86906,511.05286s-26.68056,17.3734-19.62564,28.9179c.24334.39819-31.8698,42.81114-31.8698,42.81114l-60.62192-3.84843-2.13581,20.29024,53.96989,15.6309s13.20317,9.70014,23.40295-.98735,44.17412-43.41547,44.17412-43.41547l1.63875,66.07682-17.055,91.56282,25.46506-1.61459,24.78545-91.86039,9.14869-104.05438Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M466.87374,406.78429l-11.21963,8.50264-12.78818,27.29364,12.29692,16.70079s10.34382,17.92663-6.213,35.28742-29.27075,35.903-16.01861,35.24094,66.925,26.63708,67.27817,4.27163,1.06791-39.51257,1.06791-39.51257l14.07182-35.691s8.38367-21.29157,2.49756-27.665-13.76722-14.51762-13.76722-14.51762l-14.332-14.332H476.80645Z" transform="translate(-264.64361 -112.14923)" fill="#91b5a9"/><path d="M487.81808,354.34275c25.17045,14.323,4.50676,52.1142-21.13292,38.65708C441.51551,378.6773,462.1792,340.8861,487.81808,354.34275Z" transform="translate(-264.64361 -112.14923)" fill="#a0616a"/><path d="M501.27736,362.28439c-1.76366,2.29385-5.44838,1.21828-12.66425,2.85509a30.0806,30.0806,0,0,0-.84145-7.262,20.44136,20.44136,0,0,1-3.44664,8.17266c-6.2657.69489,1.4152,19.72973-1.79293,33.72475-4.1335-29.525-12.82753-21.78969-8.43537-15.93348,2.81179,3.74905.93726,14.99621-7.49811,9.37263-13.918,6.61465-33.74148-26.24337-11.771-41.6533-.39257-8.32949,8.87553-9.64531,14.58276-7.0844C483.261,334.15853,499.08523,347.3792,501.27736,362.28439Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M436.69556,340.74042c-5.60384,34.45449-35.64018-6.33653-49.76307,27.57014-4.44043,12.279,3.1782,21.063,7.99731,31.25514,1.09987,8.37608-9.79671,12.62567-10.93808,20.33581-.31767,17.67633,28.19992,16.59465,36.17224,5.44248,8.19157-11.67441-1.59034-27.33755,3.3334-39.86846,6.92029-17.39742,35.06365-17.52667,37.51543-37.76706C456.26448,340.9467,443.4964,333.20233,436.69556,340.74042Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M459.39678,344.1072c-.18333.07721-.36666.15436-.53067.24122h-.00966c-.15435.07721-.30877.15436-.46312.24122-.01932.00966-.02892.01932-.04824.029-.20264-.193-.40523-.386-.61753-.579a2.23127,2.23127,0,0,0,.03857.94557l.029.11584c.193.20259.39558.39558.60788.59822.193-.14475.37632-.29911.56925-.44387.11584-.09646.23162-.193.35706-.28945.01926-.25088.04823-.54033.07715-.85876Zm5.80861-10.72948c-4.30339-.9842-5.69283,4.64108-6.10772,7.35239-1.5631-9.84181-8.0664-6.74451-5.81821-.029a15.03577,15.03577,0,0,0,3.30954,5.32617c.20265.23156.42455.46312.65611.69474-.26053,1.3508,1.05175,1.00346,2.8271-.24122a23.64644,23.64644,0,0,0,3.61831-3.1745C467.23162,339.59156,469.99123,334.62239,465.20539,333.37772Zm.1351,5.53841a33.71912,33.71912,0,0,1-4.44809,4.71829q-.76713.69468-1.56311,1.33154c-.00966.08681-.00966.164-.01931.23156a1.76744,1.76744,0,0,1-.1351.27014c-.54033.97454-1.14821.44387-1.37978-.3666-.01931-.029-.04823-.058-.06754-.08687a13.59562,13.59562,0,0,1-1.99732-2.64376c-3.985-6.90859,2.43152-11.60757,2.1131,1.29291a1.22205,1.22205,0,0,0-.11578.37631,2.23127,2.23127,0,0,0,.03857.94557l.029.11584c.193.20259.39558.39558.60788.59822.193-.14475.37632-.29911.56925-.44387.11584-.09646.23162-.193.35706-.28945.01926-.25088.04823-.54033.07715-.85876v-.00966c.25088-2.58587.936-7.23661,2.2-8.50061C464.38527,333.46452,467.98426,335.77061,465.34049,338.91613Zm-5.94371,5.19107c-.18333.07721-.36666.15436-.53067.24122h-.00966c-.15435.07721-.30877.15436-.46312.24122-.01932.00966-.02892.01932-.04824.029-.20264-.193-.40523-.386-.61753-.579a2.23127,2.23127,0,0,0,.03857.94557l.029.11584c.193.20259.39558.39558.60788.59822.193-.14475.37632-.29911.56925-.44387.11584-.09646.23162-.193.35706-.28945.01926-.25088.04823-.54033.07715-.85876Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M692.04013,534.06684l-9.29621,24.24343-43.60841,86.02,38.31843,100.06726L697.23,739.17708l-16.2999-94.84679,46.76372-56.82L783.23,625.17708s24.62993,19.22833,34,1,70-57,70-57l-15-16L802.4111,585.85075l-48.189-67.8277Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M738.94653,419.71251l-15.30259-16.44094-26.25-3.6113L665.23,422.17708l.324,24.92317,15.8999,58.72909s-6.05632,42.19407,10.85986,41.77091,26.13667-8.85681,33.02643-7.14,36.1776,9.02321,38.03368,1.37,11.72223-2.1734,11.28915-9.4133-26.70912-59.42671-26.70912-59.42671l6.53318-52.19189Z" transform="translate(-264.64361 -112.14923)" fill="#91b5a9"/><path d="M835.83771,344.03191a9.37336,9.37336,0,0,1-10.04227,10.28266l-35.19059,66.92659L781.157,406.73752l35.96941-63.16417a9.42414,9.42414,0,0,1,18.71131.45856Z" transform="translate(-264.64361 -112.14923)" fill="#ffb6b6"/><path d="M725.05359,432.1567s-1.39576,11.90471,12.00633,14.85193,50.53255-18.26908,56.61959-21.50955c1.90607-1.01471,4.49252-5.98844,7.14634-12.34227,1.19141-2.85251,2.3964-5.98318,3.55951-9.15866.67307-1.83761,3.896-2.33916,4.53028-4.16155.63079-1.81239-1.32682-4.94594-.75562-6.65408,2.71126-8.10776,4.63222-14.54,4.63222-14.54L803.90952,361.957c-12.42314,6.56777-18.79493,21.0345-23.48121,37.70138Z" transform="translate(-264.64361 -112.14923)" fill="#91b5a9"/><path d="M568.53346,359.40109a9.37338,9.37338,0,0,0,12.296,7.44229l50.81976,55.99017,5.51755-16.40654L586.5346,354.27445a9.42414,9.42414,0,0,0-18.00114,5.12664Z" transform="translate(-264.64361 -112.14923)" fill="#ffb6b6"/><path d="M697.84632,416.997s4.3306,11.17659-7.90745,17.384-53.49655-5.04152-60.20085-6.65554c-2.09936-.5054-5.84822-4.67359-10.00769-10.1611-1.86737-2.46358-3.8175-5.19306-5.73828-7.97641-1.11154-1.61069-4.35744-1.28972-5.4276-2.89539-1.06428-1.59685.04684-5.12061-.93366-6.63143-4.654-7.17125-8.12359-12.9181-8.12359-12.9181l4.42437-18.37754c13.67146,3.24977,23.46093,15.66156,32.16911,30.62531Z" transform="translate(-264.64361 -112.14923)" fill="#91b5a9"/><circle cx="446.39895" cy="258.35265" r="24.97608" fill="#ffb6b6"/><path d="M739.553,356.2011c-2.62724-4.0645-7.55741-6.77336-12.33685-6.01217a16.84708,16.84708,0,0,0-28.228-9.82644,5.2387,5.2387,0,0,0-5.12309-.51271,10.802,10.802,0,0,0-4.16216,3.34089,24.24317,24.24317,0,0,0-3.39231,24.66312c-.58411-2.12346,1.54395-4.12116,3.69413-4.59767,2.15-.47651,4.40539-.02571,6.58579-.336,2.79455-.39764,5.30662-2.01879,8.10559-2.38364a18.45292,18.45292,0,0,1,7.01181.901,19.01211,19.01211,0,0,0,7.009.94123c2.35582-.27972,5.39028,8.64788,5.34956,14.9359-.00774,1.19163.2377,2.72158,1.40225,2.97439,1.43413.31141,2.26516-1.668,3.63019-2.2073a2.52535,2.52535,0,0,1,3.09748,1.64714,4.11724,4.11724,0,0,1-.78607,3.68694,12.16654,12.16654,0,0,1-2.9497,2.55878l.56219.46757a3.34516,3.34516,0,0,0,4.22278.5246,9.11368,9.11368,0,0,0,3.03188-3.45219,40.623,40.623,0,0,0,5.56109-13.32571C742.71866,365.43,742.18006,360.2656,739.553,356.2011Z" transform="translate(-264.64361 -112.14923)" fill="#2f2e41"/><path d="M924.32561,454.70812C892.1101,479.10785,828.00979,471.3996,808.1177,513.195c-60.228,126.54524-111.754,30.14827-164.48777,19.72361l-.48562-2.58476c52.79008,4.37844,109.41448-2.4151,163.75112-19.64751,49.10434-15.57131,92.91452-38.73551,126.692-66.96178l1.76894,2.20918Q930.007,450.40685,924.32561,454.70812Z" transform="translate(-264.64361 -112.14923)" fill="#f2f2f2"/><path d="M788.11962,786.14558c-.76734,2.27271-438.84115,2.27262-439.669.00551C349.21694,783.87287,787.2907,783.87293,788.11962,786.14558Z" transform="translate(-264.64361 -112.14923)" fill="#ccc"/></svg>`;

const FinishStudy = ({ fontStyle }) => (
  <View flex={1} px={6} mt={-5} justifyContent='flex-start'>
    <VStack alignItems='center'>
      <SvgXml xml={FinishStudyImgXml} height='100%' width='100%' />
      <Text
        mt={-40}
        _light={{ color: 'vhlight.600' }}
        _dark={{ color: 'vhdark.600' }}
        fontFamily={fontStyle.toLowerCase()}
        textAlign='center'
        fontWeight='medium'
      >
        You've reviewed all your collection
      </Text>
    </VStack>
  </View>
);

FinishStudy.propTypes = {
  fontStyle: PropTypes.string.isRequired,
};

export default FinishStudy;
