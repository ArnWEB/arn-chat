package dev.arnab.chat.config.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {
	@MessageMapping("chat.sendMessage")
	@SendTo("/topic/public")
	public ChatMessage sendMessage(@Payload ChatMessage chantMessage) {
		return chantMessage;
	}

	@MessageMapping("chat.addUser")
	@SendTo("/topic/public")
	public ChatMessage addUser(@Payload ChatMessage chantMessage, SimpMessageHeaderAccessor header) {
		// Add username to web socket session
		header.getSessionAttributes().put("username", chantMessage.getSender());
		return chantMessage;
	}

	@MessageMapping("chat.test")
	@SendTo("/topic/public")
	public String test() {
		return "Hello world";
	}

}
