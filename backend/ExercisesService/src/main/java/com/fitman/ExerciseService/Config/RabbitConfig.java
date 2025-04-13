package com.fitman.ExerciseService.Config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;




@Configuration
public class RabbitConfig {

    public static final String EXERCISE_CREATED_QUEUE = "exercises.created.queue";

    @Bean
    public Queue exercisesCreatedQueue() {
        return new Queue(EXERCISE_CREATED_QUEUE, true);
    }

    @Bean
    public Jackson2JsonMessageConverter jacksonConverter() {
        return new Jackson2JsonMessageConverter();
    }


    // @Bean
    // public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
    //     RabbitTemplate template = new RabbitTemplate(connectionFactory);
    //     template.setMessageConverter(jacksonConverter());
    //     return template;
    // }
}
