package dev.arnab.chat.config.controller;

import java.lang.foreign.Linker.Option;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ChatMessage {
	private String sender;
	private String content;
	private MessageType messageType;
	private String id;
	private String avatar;
	private Date timestamp;
	private String type;
	
	
}

