import React, { useState } from 'react';
import { Dimensions, View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet, FlatList } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const today = new Date();
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let months = [structDate(today.getMonth() - 1), structDate(today.getMonth()), structDate(today.getMonth() + 1)];

export default function Calendar() {
  const [selectDate, setSelectDate] = useState(today.getDate());
  const [selectMonth, setSelectMonth] = useState(today.getMonth());

  const onScroll = (e) => {};
  const renderItem = (dates) => {
    return (
      <View key={dates.index} style={styles.calendar}>
        {days.map((day, index) => (
          <View key={index} style={[styles.calendarRow, index === 0 ? { marginLeft: 20 } : index === 6 && { marginRight: 20 }]}>
            <Text style={[styles.calendarDay, index === 0 ? { color: 'rgb(255,90,90)' } : index === 6 && { color: 'rgb(0,175,255)' }]}>{day}</Text>
            {dates.item[index].map((date) => (
              <TouchableWithoutFeedback key={date} onPress={() => setSelectDate(date)}>
                <Text
                  style={[
                    styles.calendarDate,
                    date === today.getDate() && { backgroundColor: 'rgb(0, 175, 255)', borderRadius: 50, color: 'white' },
                    date === selectDate && date !== '' && { borderRadius: 50, borderWidth: 2, borderColor: 'rgb(0, 175, 255)' },
                  ]}
                >
                  {date}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.year}>{today.getFullYear()}</Text>
        <Text style={styles.month}>{String(today.getMonth() + 1).padStart(2, '0')}</Text>
        <Text></Text>
      </View>
      <FlatList
        data={months}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        style={{ width: (width * 4) / 5 }}
        contentContainerStyle={{ width: ((width * 4) / 5 + 20) * 3 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  year: { flex: 1 },
  month: { flex: 1 },
  calendar: {
    flex: 4,
    flexDirection: 'row',
    width: (width * 4) / 5,
  },
  calendarRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDay: {
    fontSize: 17,
    marginBottom: 4,
  },
  calendarDate: {
    marginVertical: 2,
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

function structDate(month) {
  const thisFirstDate = new Date(today.getFullYear(), month, 1);
  const thisLastDate = new Date(today.getFullYear(), month + 1, 0);
  let dates = [[], [], [], [], [], [], []];

  for (let i = 0; i < thisFirstDate.getDay(); i++) {
    dates[i].push('');
  }

  for (let i = 1; i <= thisLastDate.getDate(); i++) {
    const aDate = new Date(today.getFullYear(), today.getMonth(), i);
    dates[(aDate.getDay() + thisFirstDate.getDay()) % 7].push(i);
  }

  for (let i = thisLastDate.getDay() + 1; i < 7; i++) {
    dates[i].push('');
  }

  return dates;
}
