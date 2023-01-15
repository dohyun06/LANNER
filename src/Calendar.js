import React, { useState } from 'react';
import { Dimensions, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const today = new Date();
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let dates = [[], [], [], [], [], [], []];

structDate();

export default function Calendar() {
  const [selectDate, setSelectDate] = useState(today.getDate());

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.year}>{today.getFullYear()}</Text>
        <Text style={styles.month}>{String(today.getMonth() + 1).padStart(2, '0')}</Text>
        <Text></Text>
      </View>
      <View style={styles.calendar}>
        {days.map((day, index) => (
          <View style={styles.calendarRow}>
            <Text style={[styles.calendarDay, index === 0 ? { color: 'rgb(255,90,90)' } : index === 6 && { color: 'rgb(0,175,255)' }]}>{day}</Text>
            {dates[index].map((date) => (
              <TouchableWithoutFeedback onPress={() => setSelectDate(date)}>
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

function structDate() {
  const thisFirstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisLastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  for (let i = 0; i < thisFirstDate.getDay(); i++) {
    dates[i].push('');
  }

  for (let i = 1; i <= thisLastDate.getDate(); i++) {
    const aDate = new Date(today.getFullYear(), today.getMonth(), i);
    dates[aDate.getDay()].push(i);
  }

  for (let i = thisLastDate.getDay() + 1; i < 7; i++) {
    dates[i].push('');
  }
}
