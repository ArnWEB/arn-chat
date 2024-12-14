package dev.arnab.chat.config;

import java.util.Date;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import dev.arnab.chat.config.controller.ChatMessage;
import dev.arnab.chat.config.controller.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListner {

	private final SimpMessageSendingOperations messageTemplate;

	@EventListener
	public void handleSeasonDisconnectEvent(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String username = (String) headerAccessor.getSessionAttributes().get("username");
		if (username != null) {
			log.info("User discpnnected {}", username);
			ChatMessage chatMessage = ChatMessage.builder().messageType(MessageType.LEAVE).sender(username).content("Leaving").avatar("").type("user").id("id").timestamp(new Date(2000, 11, 21)).build();
			messageTemplate.convertAndSend("/topic/public", chatMessage);
		}

	}

}
