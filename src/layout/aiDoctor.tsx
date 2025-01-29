import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const AiDoctor = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD4KzeCL_smq_XoZxPdW6RHk_tzK9FoHFA';

  const handleSend = useCallback(async () => {
    setInput('');
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const userMessage: Message = {role: 'user', content: trimmedInput};
      setMessages(prev => [...prev, userMessage]);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: trimmedInput,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const botText: string =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Unable to generate response';
      const botMessage: Message = {role: 'bot', content: botText};

      setMessages(prev => [...prev, botMessage]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({animated: true})
        }>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.role === 'user' ? styles.userBubble : styles.botBubble,
            ]}>
            {message.role === 'bot' ? (
              <Markdown>{message.content}</Markdown>
            ) : (
              <Text style={styles.userText}>{message.content}</Text>
            )}
          </View>
        ))}
        {isLoading && (
          <View style={[styles.messageBubble, styles.botBubble]}>
            <Text style={styles.botText}>Loading...</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/Icons/add.png')}
            style={styles.addIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            placeholderTextColor="#666"
            value={input}
            onChangeText={setInput}
            multiline
            onSubmitEditing={handleSend}
            accessibilityLabel="Type your message here"
          />
          <TouchableOpacity onPress={handleSend} disabled={isLoading}>
            <Image
              source={
                input.trim().length > 0
                  ? require('../assets/Icons/message.png')
                  : require('../assets/Icons/mic.png')
              }
              style={input.trim().length > 0 ? styles.sendIcon : styles.micIcon}
              accessibilityLabel={
                input.trim().length > 0
                  ? 'Send message'
                  : 'Record voice message'
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3d9d9',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContainer: {
    paddingVertical: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: '#007BFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'rgba(255,255,255,0.42)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  botText: {
    color: '#333',
    fontSize: 16,
  },
  inputBox: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,

  },
  inputContainer: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#c3d9d9',
  },
  input: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 12,
    maxHeight: 120,
  },
  addIcon: {
    height: 30,
    width: 30,
  },
  micIcon: {
    height: 40,
    width: 40,
  },
  sendIcon: {
    height: 25,
    width: 25,
  },
});

export default React.memo(AiDoctor);
